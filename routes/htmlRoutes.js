var path = require("path");
var router = require("express").Router();

  router.get("/note", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/note.html"));
  });

  module.exports = router;