var fs = require("fs");
const router = require("express").Router();
const path = require("path");
var notesData = require("../db/db.json");

  router.get("/notes", function (req, res) {
    res.json(notesData);
  });

  router.post("/postnotes", function (req, res) {
    
    let data = [req.body, ...notesData];

    let dataJSON = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, "../db/db.json"), dataJSON, function() {
      return res.send(dataJSON);
    });
  });

  router.delete("/notes/:id", function(req, res) {
    let notesId = req.params.id
    fs.readFile("../db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        const newNotes = allNotes.filter(notes => {
            return notes.id != notesId
        });
        fs.writeFile("../db/db.json", JSON.stringify(newNotes, null, 2), err => {
            res.send(JSON.stringify(newNotes));
        });
    });
});


module.exports = router;