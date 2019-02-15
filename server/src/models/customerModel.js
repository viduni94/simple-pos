const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

let Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mobile: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    }
});



sequelize.sync({force: true})
    .then(() => console.log('Customers table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = Customer;