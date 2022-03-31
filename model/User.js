const {model, DataTypes} = require('sequlize');
const bd = require('./db');



const User extends Model {}

User.init ({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    desciption: {
        type: DataTypes.TEXT,
    },

    title:{
        type: DataTypes.STRING,
    },

    img:{
        type: DataTypes.STRING
    },
    votes: {
        type: DataTypes.INTEGER
    }
},

{sequelize: db, modelName: 'Vote'}

);

module.exports = User