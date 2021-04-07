const fs = require('fs');
const noteData = require("../db/db.json");



function getJSON() {
    return JSON.parse(fs.readFileSync("./db/db.json", "UTF-8"))

}

module.exports = function(app) {

    //GET /api/notes - Should read the db.json file and return all saved notes as JSON.

  app.get("/api/notes", function(req, res) {
    res.json(getJSON());
  });

  //POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

  app.post("/api/notes", function(req, res) {
    const notes = getJSON()
    let newNote = req.body
    newNote.id = noteData.length-1
    notes.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), "UTF-8")
    res.json(newNote)
  });

  //DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.


  app.delete("/api/notes/:id", function(req, res) {
    const notes = getJSON()
    const id = parseInt(req.params.id)
    console.log(id)
    const filteredNotes = notes.filter(note => note.id !== id)
    console.log(filteredNotes)

    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes), "UTF-8")
    res.sendStatus(200)
  })

 
};