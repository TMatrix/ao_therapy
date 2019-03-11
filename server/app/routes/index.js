const userRouter = require('../entities/user/user.routes');
const patientRouter = require('../entities/patient/patient.routes');
const operationRouter = require('../entities/operation/operation.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	app.use('/api/patient', patientRouter);
	app.use('/api/operation', operationRouter);
};
