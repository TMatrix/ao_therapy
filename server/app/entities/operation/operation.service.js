const OperationRepository = require('./operation.repository');

class OperationService {
	constructor() {
		this.OperationRepository = OperationRepository;
	}

	getAll(patientId) {
		return this.OperationRepository.getAll(patientId).then(data => {
			const newData = data.map(el => {
				const date = new Date(el.dataValues.date);
				el.dataValues.time = `${date.getHours()}:${date.getMinutes()}`;
				el.dataValues.date = `${date.getDate()}.${date.getMonth() +
					1}.${date.getFullYear()}`;
				return el;
			});
			return newData;
		});
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

	save(operation) {
		return this.OperationRepository.save(operation)
			.then(data => data)
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
