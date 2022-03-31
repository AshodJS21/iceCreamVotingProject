const express = require("express");
//const fs = require("fs/promises");
const session = require('express-session');
const {authenticate} = require('./db')


const app = express(); 
app.set('view engine', 'ejs');
app.use(express.static ('public'));
app.use(express.urlencoded ({extended: true}));
const port = process.env.port || 8008





app.get("/",async (req, res) =>{
    //const fileContent = await fs.readFile('./public/index', {encoding: 'utf8'});
    //res.send(fileContent);
    res.render('index')
})













const addVote = async (req, res, next ) =>{
    const existingUser = await Vote.findOne({
    where :{email:req.body.email, articleID:req.body.articleID}});
    if (existingUser){
    next();
    } else{
    await Vote.create({articleID: reqbody.articleID, email: req.body.email});
    next ();
    }
}







app.get('/', getAllVotes,  (req, res) =>{
    res.render('index')
})



app.post('/vote',  (req,res) =>{
    console.log(req.body);
    res.redirect('/')
})


authenticate()
//app.listen(port, () => console.log('terminal is running' + port))
app.listen(8080)
