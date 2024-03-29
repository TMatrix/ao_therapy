const Sequelize = require('sequelize');
const sequelize = require('../../../db/connection');

const Patient = sequelize.define('patients', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-z ]{1,100}$/i, msg: 'Not valid name' }
		}
	},
	age: {
		type: Sequelize.SMALLINT,
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
			is: { args: /^[a-z]{1}$/i, msg: 'Not valid sex value' }
		}
	},
	department: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: {
				args: /^[a-z ]{1,100}$/i,
				msg: 'Not valid department value'
			}
		}
	},
	date: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[.0-9]{1,15}$/i, msg: 'Not valid data' }
		}
	},
	recommendedAO: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			is: {
				args: /^[a-zA-Z ]{1,20}$/i,
				msg: 'Not valid antioxydant name'
			}
		}
	}
});

Patient.sync();

module.exports = Patient;
