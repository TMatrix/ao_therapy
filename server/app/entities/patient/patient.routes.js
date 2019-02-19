const patient = require('express').Router();
const patientService = require('./patient.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

patient.get('/', (req, res, next) => {
	patientService
		.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

patient.get('/:id', (req, res, next) => {
	patientService
		.getById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

patient.post('/', (req, res, next) => {
	patientService
		.save(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = patient;
