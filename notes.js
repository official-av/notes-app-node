const fs = require("fs");

//fetched saved notes from fs
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  } //handles file not available error
};

//saves updated notes to fs
var saveNotes = notes =>
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));

//add note to existing notes
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

//fetch all saved notes from fs
var getAll = () => {
  return fetchNotes();
};

//read a single note from fs
var getNote = title => {
  var notes = fetchNotes();
  var filteredNote = notes.filter(note => note.title === title);
  return filteredNote[0];
};

//remove a single note from fs
var removeNote = title => {
  var notes = fetchNotes();
  var removedNotes = notes.filter(note => note.title !== title);
  saveNotes(removedNotes);
  return notes.length !== removedNotes.length;
};

var logNote = note => {
  console.log("--");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = { addNote, getAll, getNote, removeNote, logNote };
