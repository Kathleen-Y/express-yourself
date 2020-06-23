var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 3300;
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
    readNotes(function (data) {
        res.json(data)
    })
});

function readNotes(callback) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        return callback(JSON.parse(data));
    });
}


function writeNotes(notes, callback) {
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            return console.log(err);
        }
        callback();
    });
};

app.post("/api/notes", function (req, res) {
    readNotes(function (data) {
        console.log(req.body)
        var newNote = req.body;
        data.push(newNote)
        writeNotes(data, function () {
            res.send("success")
        })
    })
});

app.delete("/api/notes/:id", function (req, res) {
    var chosen = parseInt(req.params.id);
    readNotes(function (data) {
        console.log(req.body)

        for (var i = 0; i < data.length; i++) {
            if (chosen === data[i].id) {
              data.splice(i, 1);
            }
        }
        writeNotes(data, function () {
            res.send("success")
        })
    });
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});