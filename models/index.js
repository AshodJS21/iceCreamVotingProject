const db = require("../db/index");

const User = require('./user')
const Flavor = require('./flavor')

Flavor.hasMany(User)
User.belongsTo(Flavor)

async function setup(){
    await db.sync({force: true})
}

async function seed(){
    await Flavor.bulkCreate([
          {flavorName:"Chocolate"},
          {flavorName:"Blueberry"},
          {flavorName:"Kiwi"},
          {flavorName:"Limon"},
          {flavorName:"Milk"},
          {flavorName:"Minst"},
          {flavorName:"Mocca"},
          {flavorName:"Orange"},
          {flavorName:"Pear"},
          {flavorName:"Strawberry"},
          {flavorName:"Vanilla"},
        ]) 
}

async function start(){
    await setup()
    await seed()
}

start()

module.exports = {User, Flavor}
