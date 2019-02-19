const Sequelize = require('sequelize');
const sequelize = require('../../../db/connection');

const Patient = sequelize.define('patients', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z ]{1,100}$/i, msg: 'Not valid name' }
		}
	},
	age: {
		type: Sequelize.TINYINT,
		allowNull: false,
		validate: {
			is: { args: /^[0-9]{1,3}$/i, msg: 'Not valid age value' }
		}
	},
	case: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			is: { args: /^[0-9]{1,10}$/i, msg: 'Not valid case history value' }
		}
	},
	sex: {
		type: Sequelize.CHAR,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z]{1}$/i, msg: 'Not valid sex value' }
		}
	},
	department: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z ]{1,100}$/i, msg: 'Not valid department value' }
		}
	},
	data: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z.]{1,15}$/i, msg: 'Not valid data' }
		}
	}
});

Patient.sync();

module.exports = Patient;
