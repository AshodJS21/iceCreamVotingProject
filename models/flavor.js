const {Model, DataTypes} = require('sequelize')
const index = require('../db/index')

class Flavor extends Model{}

  Flavor.init(
    {
      flavorName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      flavorId:{
          type: DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
      },
      numVotes:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize: index,
      modelName: 'Flavor',
      timestamps: false
    }
  )

  module.exports = Flavor