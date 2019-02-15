const Menu = require('./menuModel');
const User = require('./userModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');
const Customer = require('./customerModel');
const FoodItem = require('./foodItemModel');

//Associations
Customer.hasMany(Order, {
    foreignKey: 'customerId',
    targetKey: 'id'
});

Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    targetKey: 'id'
});

Menu.hasMany(FoodItem, {
    foreignKey: 'menuId',
    targetKey: 'id'
});

OrderItem.belongsTo(FoodItem, {
    foreignKey: 'foodItemId',
    targetKey: 'id'
});

User.hasMany(Order, {
    foreignKey: 'userId',
    targetKey: 'id'
});