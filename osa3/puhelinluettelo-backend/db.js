var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

var uri = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.zx1mw.mongodb.net/fullstackmooc?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

var schema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
  },
  number: {
      type: String,
      required: true,
      minlength: 8
  }
});

schema.plugin(uniqueValidator)

schema.set('toJSON', {
    transform: function (document, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

var Person = mongoose.model("Person", schema);

function getPersons() {
    return Person.find()
}

function getPerson(name) {
    return Person.findOne({ name })
}

function getPersonById(id) {
    return Person.findById(id)
}

function getPersonCount() {
    return Person.count({})
}

function addPerson(name, number) {
    var person = new Person({ name, number })
    return person.save()
}

function removePerson(id) {
    return Person.findByIdAndDelete(id)
}

function updatePerson(id, number) {
    return Person.findByIdAndUpdate(id, { number }, { new: true })
}

module.exports = {
    getPersons,
    getPerson,
    getPersonById,
    addPerson,
    removePerson,
    updatePerson,
    getPersonCount
}
