console.log("starting app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");
const argv = yargs.argv;
var command = argv._[0];

console.log("Yargs", argv);

console.log("Command: ", command);

if (command === "add") {
  //add note
  var note = notes.addNote(argv.title, argv.body);
  if (note)
    console.log(
      "Note with title: " + note.title + " and body: " + note.body + " saved!"
    );
  else {
    console.log(
      "ERROR ! A note with title: '" + argv.title + "' already exists."
    );
  }
} else if (command === "list") {
  //list all notes
  notes.getAll();
} else if (command === "read") {
  //read note
  var note = notes.getNote(argv.title);
  if (note)
    console.log(
      `Here's the note content: title- ${note.title} body- ${note.body}`
    );
  else console.log(`Note with title: ${argv.title} was not found!`);
} else if (command === "remove") {
  //remove note
  var isRemoved = notes.removeNote(argv.title);
  if (isRemoved) console.log(`Note with title: ${argv.title} was removed!`);
  else console.log(`Note with title: ${argv.title} was not found!`);
} else {
  console.log("invalid command");
}
// console.log(_.isString(12));
// console.log(_.uniq([3, 9, 3, 4, 5, 6]));
// var user = os.userInfo();
// fs.appendFile("greetings.txt", `hello ${user.username}`, err => {
//   if (err) console.log("error while appending to file");
// });
// var sum = notes.add(9, -2);
// console.log(`sum is ${sum}`);
// console.log(notes.age);
