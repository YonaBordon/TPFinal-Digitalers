const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN);

		console.log('DB Online');
	} catch (error) {
		console.log(error);
		throw new Error('Error when starting the database');
	}
};

module.exports = {
	dbConnection,
};
