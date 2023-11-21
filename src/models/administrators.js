const { Schema, model } = require('mongoose');

const AdministratorSchema = Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'El usuario es requerido'],
			unique: true,
		},
	},
	{
		versionKey: false,
	},
);

AdministratorSchema.methods.toJSON = function () {
	const { __v, ...administrator } = this.toObject();
	return administrator;
};

module.exports = model('Administrator', AdministratorSchema);
