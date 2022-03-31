const bd = require('./db');
const Vote = require('./model/Vote');

async function authenticate(){
     try{
         bd.authenticate();
         Vote.sync();
         console.log('checked')
     } catch (error){
         console.log('error didnt pass' + error);
     }
}

authenticate();
module.exports = {authenticate};