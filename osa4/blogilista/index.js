require('dotenv').config()
var app = require('./app')

var port = process.env.PORT || 3002
app.listen(port, () => {

})
