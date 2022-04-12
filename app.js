const bcrypt = require("bcryptjs");
const express = require("express");
const session = require("express-session");
require("dotenv").config();
const { User, Flavor } = require("./models/index");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


//getting home page
app.get("/home", async (req, res) => {
  await home(res, req);
});


//adding vote condition  "form"
app.post("/voting", async (req, res) => {
  const { flavor } = req.body;
  const username = req.session.user.userName;
  const usermail = req.session.user.userEmail;
  const dupUser = await User.findOne({ where: { email: usermail } });
  if (!dupUser.FlavorFlavorId) {
    const votedFlavor = await Flavor.findOne({ where: { flavorId: flavor } });
    votedFlavor.increment("numVotes", { by: 1 });
    await User.update(
      { FlavorFlavorId: flavor },
      { where: { email: usermail } }
    );
    res.redirect("done");
  } else {
    res.render("addProduct", {
      message:
        "Seems you have already voted",
      link: "/home",
      linkname: "Back to home",
    });
  }
});
 


//main page
app.get("/", (req, res) => {
  res.render("startPage");
});
 


//done page
app.get("/done", (req, res) => {
  res.render("done", { registeredUser: req.session.user.userName });
}); 


//singing up
app.get("/singup", (req, res) => {
  res.render("singup");
});
 

//sining up condition "form"
app.post("/singup", async (req, res) => {
  const { username, password, usermail } = req.body;
  const dupUser = await User.findOne({ where: { email: usermail } });
  if (!dupUser) {
    await User.create({
      userName: username,
      email: usermail,
      password: generateHash(password),
    });
    res.render("addProduct", {
      message: "Singed Up! Login to continue",
      link: "/login",
      linkname: "Login",
    });
  } else {
    res.render("addProduct", {
      message: "Seems you already have an account.",
      link: "/login",
      linkname: "Back to Login",
    });
  }
});
 
 
//getting most popular proucts
async function getAll() {
  return await Flavor.findAll({
    order: [["numVotes", "DESC"]],
    attributes: ["flavorName", "numVotes"],
    raw: true,
    limit: 10,
  }).then((flavors) =>
    flavors.map((flavor) => ({
      flavorName: flavor.flavorName,
      numVotes: flavor.numVotes,
    }))
  );                                                    
}


 
async function getAll() {
  return await Flavor.findAll({
    attributes: ["flavorName", "flavorId"],
    raw: true,
  }).then((flavors) =>
    flavors.map((flavor) => ({
      flavorName: flavor.flavorName,
      flavorId: flavor.flavorId,
    }))
  );
}
 


// passw
function generateHash(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}
 

app.get("/login", (req, res) => {
  res.render("login", { regsuccess: false });
}); 


app.post("/login", async (req, res) => {
  try {
    const { usermail, password } = req.body;
    const user = await User.authenticate(usermail, password);
    req.session.user = {
      userName: user.userName,
      userEmail: user.email,
    };
    res.redirect("home");
  } catch (error) {
    req.session.errorMessage = error.message;
    res.render("addProduct", {
      message: "Unavailable. Try again",
      link: "/login",
      linkname: "Login",
    });
  }
});
 

//log out
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
 

async function home(res, req) {
  if (req.session.user) {
    res.render("home", {
      top10Flavors: await getAll(),
      user: req.session.user,
      allFlavors: await getAll(),
    });
  } else {
    res.render("addProduct", {
      message: "Try again",
      link: "/",
      linkname: "startPage",
    });
  }
} 


// form post
app.post("/addflavor", async (req, res) => {
  const { flavorname } = req.body;
  await Flavor.create({
    flavorName: flavorname,
  });
  res.render("addProduct", {
    message:
      "You successfully added a new product",
    link: "/home",
    linkname: "Back to home",
  });
});

app.listen(8080);