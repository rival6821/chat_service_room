var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  backURL = req.header("Referer") || "/";
  res.redirect(backURL);
});

router.get("/:id", function (req, res, next) {
  var room = req.params.id;

  res.render("room", { room: room });
});

module.exports = router;
