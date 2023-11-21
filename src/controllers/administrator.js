const { response } = require('express');
const { Administrator, User } = require('../models');

const getRole = async (id) => {
	const admin = await Administrator.findOne({ user: id });

	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({
			msg: 'El usuario no existe',
			admin: false,
		});
	}

	if (!user.status) {
		return res.status(400).json({
			msg: 'El usuario está desactivado',
			admin: false,
		});
	}

	if (!admin) {
		return res.status(404).json({
			msg: `El usuario ${user.username} no es administrador`,
			admin: false,
		});
	}
	
	return res.json({
		admin: true,
	});
};

const addAdmin = async (req, res = response) => {
	const id = req.params.id;

	const isAdmin = await Administrator.findOne({ user: id });
	if (isAdmin) {
		return res.status(400).json({
			msg: 'El usuario ya es administrador',
		});
	}

	const admin = new Administrator({
		user: id,
	});

	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({
			msg: 'El usuario no existe',
		});
	}

	if (!user.status) {
		return res.status(400).json({
			msg: 'El usuario está desactivado',
		});
	}

	await admin.save();

	res.json({
		msg: `El usuario ${user.username} ahora es administrador`,
	});
};

const deleteAdmin = async (req, res = response) => {
	const id = req.params.id;

	const admin = await Administrator.findOne({ user: id });

	if (!admin) {
		return res.status(404).json({
			msg: 'El usuario no es administrador',
		});
	}

	await Administrator.findByIdAndDelete(admin._id);

	res.json({
		msg: 'El usuario ya no es administrador',
	});
};

module.exports = {
	getRole,
	addAdmin,
	deleteAdmin,
};
