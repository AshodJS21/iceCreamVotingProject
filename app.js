const express = require("express");
//const fs = require("fs/promises");
const { authenticate } = require("./db");
const Vote = require("./models/Vote");


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));




app.get("/", async (req, res) => {
  //const fileContent = await fs.readFile('./public/index', {encoding: 'utf8'});
  //res.send(fileContent);
  res.render("index");
});


const addVote = async (req, res, next) => {
  const existingUser = await Vote.findOne({
    where: { email: req.body.email }, //iceCream: req.body.icecream},
  });
  if (existingUser) {
    next();
  } else {
    await Vote.create({
      email: req.body.email,
      iceCream: req.body.icecream,
      Votes: req.body.vote,
    });
    next();
  }
};


const getAllVotes = async (req, res, next) => {};

//1
app.get("/", getAllVotes, (req, res) => {
  res.render("index");
});


//2
app.post("/vote", addVote, (req, res) => {
  console.log(req.body);
  res.redirect("/");
});




//bd browser
//select iceCream, count (iceCream) from Votes group by iceCream;

authenticate();
//app.listen(port, () => console.log("terminal is running" + port));
app.listen(8080);
