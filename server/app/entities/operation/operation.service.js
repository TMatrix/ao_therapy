const OperationRepository = require('./operation.repository');
const PatientService = require('../patient/patient.service');

class OperationService {
	constructor() {
		this.OperationRepository = OperationRepository;
	}

	getAll(patientId) {
		return this.OperationRepository.getAll(patientId);
	}

	getById(id) {
		return this.OperationRepository.getById(id)
			.then(data => {
				if (data === null) {
					throw new Error('Operation does not exist');
				} else {
					return data;
				}
			})
			.catch(err => {
				throw err;
			});
	}

	save(payload) {
		return this.OperationRepository.save(payload.operation)
			.then(data => {
				if (data.dataValues.isRecommended) {
					const patientId = +data.dataValues.patient_id;
					PatientService.getById(patientId).then(patient => {
						PatientService.update(patientId, {
							recommendedAO: data.dataValues.name,
							...patient
						});
					});
				}
				return data;
			})
			.catch(err => {
				throw err;
			});
	}

	remove(id) {
		return this.OperationRepository.removeById(id)
			.then(data => data)
			.catch(err => {
				throw err;
			});
	}

	update(id, operation) {
		return this.OperationRepository.update(id, operation)
			.then(data => data)
			.catch(err => {
				throw err;
			});
	}
}

module.exports = new OperationService();
