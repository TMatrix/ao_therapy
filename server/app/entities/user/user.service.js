const UserRepository = require('./user.repository');

class UserService {
	constructor() {
		this.UserRepository = UserRepository;
	}
}

module.exports = new UserService();
