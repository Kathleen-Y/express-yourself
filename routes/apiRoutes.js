var fs = require("fs");
const router = require("express").Router();
const path = require("path");
var noteData = require("../db/db.json");

  router.get("/note", function (req, res) {
    res.json(noteData);
  });

// Retrieves user input from /notes page and sends it to JSON file
  router.post("/postnote", function (req, res) {
    
    let data = [req.body, ...noteData];

    let dataJSON = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, "../db/db.json"), dataJSON, function() {
      return res.send(dataJSON);
    });
  });

  router.delete("/note/:id", function(req, res) {
    let noteId = req.params.id
    fs.readFile("./develop/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNote = JSON.parse(data);
        const newNote = allNote.filter(note => {
            return note.id != noteId
        });
        fs.writeFile("./developer/db.json", JSON.stringify(newNote, null, 2), err => {
            res.send(JSON.stringify(newNote));
        });
    });
});


module.exports = router;