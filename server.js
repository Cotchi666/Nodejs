const express = require("express");
var app = express();

var router1 = require("./apiRouter");

app.get("/", (req, res) => {
    res.json("Home");
});

app.use("/api/", router1);

app.listen(3000, () => {
    console.log("server started on port");
});
