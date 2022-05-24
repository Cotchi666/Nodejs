const express = require("express");
var app = express();

var router1 = require("./apiRouter");

app.get("/", (req, res) => {
    res.json("Home");
});

app.use("/api/v1/", router1);

app.listen(3000, () => {
    console.log("server started on port");
});
