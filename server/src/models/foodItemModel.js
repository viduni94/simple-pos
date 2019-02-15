const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

let FoodItem = sequelize.define('foodItems', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unitPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log('Food Items table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = FoodItem;