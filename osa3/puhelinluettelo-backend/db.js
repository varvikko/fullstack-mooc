var mongoose = require("mongoose");

var uri = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.zx1mw.mongodb.net/fullstackmooc?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

var schema = new mongoose.Schema({
  name: String,
  number: String,
});

var Person = mongoose.model("Person", schema);

function getPersons() {
    return Person.find()
}

function getPerson(name) {
    return Person.findOne({ name })
}

function addPerson(name, number) {
    var person = new Person({ name, number })
    return person.save()
}

module.exports = {
    getPersons,
    getPerson,
    addPerson
}
