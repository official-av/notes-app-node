console.log("Your personal note saver.. Run --help for commands");
const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");
const argv = yargs
  .command("add", "Add a note", {
    title: { describe: "Your note's title", demand: true, alias: "t" },
    body: { describe: "Your note's body", demand: true, alias: "b" }
  }) //desc for add cmd
  .command("list", "Get all notes", {}) //desc for list cmd
  .command("read", "Get a note", {
    title: { describe: "Your note's title", demand: true, alias: "t" }
  }) //desc for read cmd
  .command("remove", "Remove a note", {
    title: { describe: "Your note's title", demand: true, alias: "t" }
  }) //desc for remove cmd
  .help().argv;
var command = argv._[0];

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
  var notesList = notes.getAll();
  if (notesList.length !== 0)
    for (let note of notesList) {
      notes.logNote(note);
    }
  else console.log("No notes found!");
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
