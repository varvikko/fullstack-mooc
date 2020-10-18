function dummy(blogs) {
    return 1
}

function totalLikes(blogs) {
    return blogs.reduce((p, c) => p + c.likes, 0)
}

function favoiteBlog(blogs) {
    return blogs.reduce((p, c) => c.likes > p.likes ? c : p)
}

function mostBlogs(blogs) {
    var authors = blogs.map(blog => blog.author)
    var author = authors.sort((a, b) => authors.filter(v => v === a).length - authors.filter(v => v === b).length).pop()
    return {
        author,
        blogs: blogs.filter(blog => blog.author === author).length
    }   
}

function mostLikes(blogs) {
    var x = {}

    blogs.forEach(({ author, likes }) => {
        if (x[author] !== undefined) {
            x[author] += likes
        } else {
            x[author] = likes
        }
    })

    var mostLikes = Math.max(...Object.values(x))
    var i = Object.values(x).indexOf(mostLikes)
    var author = Object.keys(x)[i]
    return {
        author,
        likes: mostLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoiteBlog,
    mostBlogs,
    mostLikes
}
