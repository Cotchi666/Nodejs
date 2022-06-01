import express from "express";
// app

//var : global
//let : local
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    //public tell the server to know where to use resouces from "./src/public"
    app.set("view engine", "ejs"); //jsp, blade for go~ js trong html
    app.set("views", "./src/views") // mac dinh viet client trong views
}

module.exports = configViewEngine;
