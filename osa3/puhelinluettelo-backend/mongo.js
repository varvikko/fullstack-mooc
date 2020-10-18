var mongoose = require("mongoose");

var [password, name, number] = process.argv.slice(2);
var uri = `mongodb+srv://fullstack:${password}@cluster0.zx1mw.mongodb.net/fullstackmooc?retryWrites=true&w=majority`;

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

var person = new Person({
  name,
  number,
});

if (process.argv.length <= 3) {
  console.log("phonebook:");
  Person.find().then((result) => {
    result.forEach((e) => console.log(e.name, e.number));
    mongoose.disconnect();
  });
} else {
  person.save((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.disconnect();
  });
}
