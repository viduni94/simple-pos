const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

let Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    orderDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    itemCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log('Orders table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = Order;