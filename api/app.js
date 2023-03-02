//jshint esversion:6
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.json({
  type: ['application/json', 'text/plain']
}))

const urlDB = process.env.MONGODB_URL;
mongoose.connect(urlDB, {useNewUrlParser : true},()=>{
  console.log("Connected to the database");
});

const authRoute = require("./routes/auth");
const taskRoute = require("./routes/tasks");


app.listen(8000, function() {
  console.log("Server started on port 8000");
});


app.use("/api/tasks",taskRoute);
app.use("/api/auth",authRoute);


app.get("/", function(req,res){
  res.send("welcome to the home Page");
});
