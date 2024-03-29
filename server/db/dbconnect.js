const sequelize = require('./connection');

function DBConnectionHandler() {
	sequelize
		.authenticate()
		.then(() => 'Connection has been established successfully.')
		.catch(err => {
			throw err;
		});
}

module.exports = DBConnectionHandler;
