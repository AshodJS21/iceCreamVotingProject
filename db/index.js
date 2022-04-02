const db = require("./db");
const Vote = require("../models/Vote");

async function authenticate() {
  try {
    db.authenticate();
    Vote.sync();
    //console.log("Authentication  works");
  } catch (error) {
    //console.log("databas has an error : " + error);
  }
}

module.exports = { authenticate };
