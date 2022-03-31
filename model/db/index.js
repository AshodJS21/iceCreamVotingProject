const {sequelize} = require('sequelize');

module.export =new Sequelize({
    dialect: 'sqlite',
    storage:'./db'
})