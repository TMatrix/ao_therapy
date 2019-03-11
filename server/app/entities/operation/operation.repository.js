const Repository = require('../../common/repository/repository');
const operationModel = require('../operation/operation.model');

class OperationRepository extends Repository {
	constructor() {
		super();
		this.model = operationModel;
	}

	getAll(patientId) {
		return this.model.findAll({
			where: {
				patient_id: patientId
			}
		});
	}

	getById(id) {
		return this.model.findByPk(id);
	}

	save(operation) {
		return this.model.create(operation);
	}

	removeById(id) {
		return this.model.destroy({
			where: {
				id
			}
		});
	}

	update(id, operation) {
		return this.model.update(operation, {
			where: {
				id
			}
		});
	}
}

module.exports = new OperationRepository();
