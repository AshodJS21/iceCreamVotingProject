const {Model, DataTypes} = require('sequelize')
const index = require('../db/index')
const bcrypt = require("bcryptjs");


class User extends Model{
  static async authenticate(email, password){
    const user = await User.findOne({where: {email}})
    if(!user){ 
      throw new Error('Invalid email')
    }
    if(!bcrypt.compareSync(password, user.password)){
      throw new Error('Invalid password')
    }      
    return user
  }
}

  User.init(
    {
      userName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId:{
          type: DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
      },
      password:{
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize: index,
      modelName: 'User',
      timestamps: false
    }
  )

  module.exports = User