var mongoose = require('mongoose')


if (process.env.NODE_ENV === 'test') {
    var url = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.zx1mw.mongodb.net/fullstackmooc-test?retryWrites=true&w=majority`
} else {
    var url = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.zx1mw.mongodb.net/fullstackmooc?retryWrites=true&w=majority`
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("connected")
    })
    .catch((error) => {
        console.log("error:", error)
    })
