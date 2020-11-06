const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const typeDefs = gql`
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
        me: User
        genres: [String]!
        favoriteGenre: String!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.countDocuments(),
        authorCount: () => Author.countDocuments(),
        allBooks: (root, args) => {
            return Book.find(
                args.genre ? { genres: { $in: args.genre } } : {}
            ).populate('author')
        },
        allAuthors: async () => {
            let authors = await Author.find({})
            let books = await Book.find({}).populate('author')
            authors.forEach((author) => {
                author.bookCount = books.filter(
                    (book) => book.author.name === author.name
                ).length
            })
            return authors
        },
        me: (root, args, context) => {
            return context.user
        },
        genres: async (root, args) => {
            let books = await Book.find({})
            let genres = new Set()
            books.forEach((book) => {
                book.genres.forEach((genre) => genres.add(genre))
            })
            return Array.from(genres)
        },
        favoriteGenre: async (root, args, context) => {
            let user = await User.findOne({ username: context.user.username })
            return user.favoriteGenre
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.user) {
                throw new UserInputError('Access denied')
            }
            try {
                let author = await Author.findOne({ name: args.author })

                if (!author) {
                    author = new Author({ name: args.author })
                    author = await author.save()
                }
                let book = new Book({ ...args, author: author._id })
                let x = await book.save()
                x.author = author
                return x
            } catch (e) {
                throw new UserInputError(e.message, { invalidArgs: args })
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.user) {
                throw new UserInputError('Access denied')
            }
            try {
                return await Author.findOneAndUpdate(
                    { name: args.name },
                    { born: args.setBornTo },
                    { new: true }
                )
            } catch (e) {
                throw new UserInputError(e.message, { invalidArgs: args })
            }
        },
        createUser: async (root, args) => {
            if (!args.username || !args.favoriteGenre) {
                throw new UserInputError('Missing data')
            }

            let user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })
            return user.save()
        },
        login: (root, args) => {
            if (!args.username || !args.password) {
                throw new UserInputError('Missing credentials')
            }

            if (args.password !== 'password') {
                throw new UserInputError('Invalid password')
            }

            let token = jwt.sign({ username: args.username }, process.env.SECRET)
            return {
                value: token
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            let decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
            let user = await User.findOne({ username: decodedToken.username })
            return { user }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

let dbUri = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.zx1mw.mongodb.net/library?retryWrites=true&w=majority`
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
