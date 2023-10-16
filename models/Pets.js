const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Pets extends Model {}

Pets.init(
    {
        pet_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        care_level:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            aloowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pets'
    }
);

module.exports = Pets;