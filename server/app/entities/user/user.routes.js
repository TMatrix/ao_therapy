const user = require('express').Router();

user.get('/', (req, res, next) => {
	res.send('Hello');
});

module.exports = user;
