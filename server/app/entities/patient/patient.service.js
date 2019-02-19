const PatientRepository = require('./patient.repository');

class PatientService {
	constructor() {
		this.PatientRepository = PatientRepository;
	}

	getAll() {
		return this.PatientRepository.getAll();
	}

	getById(id) {
		return this.PatientRepository.getById(id)
			.then(data => {
				if (data === null) {
					throw new Error('Patient does not exist');
				} else {
					return data;
				}
			})
			.catch(err => {
				throw err;
			});
	}

	save(patient) {
		return this.PatientRepository.save(patient)
			.then(data => data)
			.catch(err => {
				throw err;
			});
	}

	remove(id) {
		return this.PatientRepository.removeById(id)
			.then(data => data)
			.catch(err => {
				throw err;
			});
	}

	update(id, patient) {
		return this.PatientRepository.update(id, patient)
			.then(data => data)
			.catch(err => {
				throw err;
			});
	}
}

module.exports = new PatientService();
