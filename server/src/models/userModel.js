const sequelize = require('./config/sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

let User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.getSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

sequelize.sync()
    .then(() => console.log('Users table has been created successfully, if non-existent before'))
    .catch(error => console.log('An error occurred', error));

module.exports = User;
