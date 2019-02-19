const Sequelize = require('sequelize');
const sequelize = require('../../../db/connection');

const User = sequelize.define('users', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z0-9_ ]{1,100}$/i, msg: 'Not valid name' }
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: { msg: 'Not valid email' }
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

User.sync();

module.exports = User;
