const {Model, DataTypes} = require('sequelize')

module.exports = database => {

    class Flavour extends Model{}
    Flavour.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            }, 
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, 
        {
            sequelize: database,
            timestamps: false,
            modelName: 'Flavour'
        }
    )
    return Flavour
}