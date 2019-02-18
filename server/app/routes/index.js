const userRouter = require('../entities/user/user.routes');
// const patientRouter = require('../entities/patient/patient.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	// app.use('/api/patient', patientRouter);
};
