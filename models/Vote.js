const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    iceCream: {
      type: DataTypes.STRING,
    },
    Votes :{
      type: DataTypes.INTEGER,
    }
  },
  
  { sequelize: db, modelName: "Vote" }
);

module.exports = Vote;
