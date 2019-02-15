const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

let OrderItem = sequelize.define('orderItems', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    itemCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log('Order Items table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = OrderItem;