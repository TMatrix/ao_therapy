const Sequelize = require('sequelize');
const sequelize = require('../../../db/connection');

const Operation = sequelize.define('operations', {
	patient_id: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			is: { args: /^[a-zA-Z ]{1,100}$/i, msg: 'Not valid name' }
		}
	},
	date: {
		type: Sequelize.STRING,
		allowNull: false
	},
	treatment: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			is: { args: /^[0-9]{1}$/i, msg: 'Not valid treatment number' }
		}
	},
	taa: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	lactate: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	pyruvate: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	isRecommended: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	}
});

Operation.sync();

module.exports = Operation;
