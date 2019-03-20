const Repository = require('../../common/repository/repository');
const patientModel = require('../patient/patient.model');

class PatientRepository extends Repository {
	constructor() {
		super();
		this.model = patientModel;
	}

	getAll() {
		return this.model.findAll();
	}

	getById(id) {
		return this.model.findByPk(id);
	}

	save(patient) {
		return this.model.create(patient);
	}

	removeById(id) {
		return this.model.destroy({
			where: {
				id
			}
		});
	}

	update(id, patient) {
		return this.model.update(patient, {
			where: {
				id
			}
		});
	}
}

module.exports = new PatientRepository();
