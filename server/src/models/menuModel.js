const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

let Menu = sequelize.define('menu', {
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
    }
});

sequelize.sync()
    .then(() => console.log('Menu table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = Menu;