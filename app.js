const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/conn");
// const User = require('./model/userSchema');

app.use(express.json());

// linked the router file to make route easy
app.use(require("./router/auth"));

// 2.heroku
const PORT = process.env.PORT || 5000;

// app.get('/about', (req, res) => {
//     res.send(`Hello About world from server`);
// });

// app.get('/contact', (req, res) => {
//     // res.cookie("Test", 'rohit');
//     res.send(`Hello Contact world from server`);
// });

// app.get('/signin', (req, res) => {
//     res.send(`Hello Login world from server`);
// });

app.get("/signup", (req, res) => {
  res.send(`Hello Registration world from server`);
});

// 3. heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
