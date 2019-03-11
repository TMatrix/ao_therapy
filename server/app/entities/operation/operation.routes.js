const operation = require('express').Router();
const operationService = require('./operation.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

operation.get('/:patientId', (req, res, next) => {
	operationService
		.getAll(req.params.patientId)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// operation.get('/:id', (req, res, next) => {
// 	operationService
// 		.getById(Number(req.params.id))
// 		.then(PayloadGeneratorService.nextWithData(next, res))
// 		.catch(next);
// });

operation.post('/', (req, res, next) => {
	operationService
		.save(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = operation;
