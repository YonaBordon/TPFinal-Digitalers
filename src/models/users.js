const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	username: {
		type: String,
		required: [true, 'El nombre de usuario es requerido'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'El correo es requerido'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'La contraseña es requerida'],
	},
	status: {
		type: Boolean,
		default: true,
	},
}, {
	timestamps: true,
	versionKey: false,
});

UserSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject();
	return user;
};

module.exports = model('User', UserSchema);
