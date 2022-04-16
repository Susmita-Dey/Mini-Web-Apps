// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //   console.log(__dirname); // Gives the path of the current folder in the console
  res.sendFile(__dirname + "/index.html"); // sends file to the browser
});

app.post("/", function (req, res) {
  //   console.log(req.body.num1);
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;
  res.send("The result of the calculation is " + result);
});

app.listen(port, function () {
  console.log("Server started on port: " + port);
});
