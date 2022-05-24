const express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json("router home");
});

router.get("/product", (req, res) => {
  res.json("router product");
});

router.get("/user", (req, res) => {
  res.json("router user");
});

//nen de sau khi truyen tham so
router.get("/:id", (req, res) => {
  res.json("Home" + req.params.id);
});

module.exports = router;
