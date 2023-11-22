const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers/generateJWT');

const userRegister = async (req, res = response) => {
	const { username, email, password } = req.body;

	try {
		// Check if email exists
		const checkEmail = await User.findOne({ email });
		if (checkEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo ya está registrado',
			});
		}

		const checkUserName = await User.findOne({ username });
		if (checkUserName) {
			return res.status(400).json({
				ok: false,
				msg: 'El nombre de usuario ya está registrado',
			});
		}

		// Create user with the model
		const user = new User({ username, email, password });

		// Encrypt password
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);

		await user.save();

		res.status(201).json({
			ok: true,
			msg: 'register',
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error, contacte al administrador',
		});
	}
};

const userLogin = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: 'No hay ningun usuario registrado con ese correo',
			});
		}

		// Check if user is active
		if (!user.status) {
			return res.status(400).json({
				msg: 'El usuario no está activo',
			});
		}

		// Check password
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'La contraseña es incorrecta',
			});
		}

		// Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			msg: 'Usuario logueado',
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contacte al administrador',
		});
	}
};

const getUsers = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { status: true };

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(from)).limit(Number(limit)),
	]);

	res.json({
		msg: 'Lista de usuarios',
		total,
		users,
	});
};
// TODO: Implement the following functions
const changeUserEmail = async (req, res = response) => {};
const changeUserPassword = async (req, res = response) => {};

const deleteUser = async (req, res = response) => {
	const { id } = req.params;

	const user = await User.findByIdAndUpdate(id, { status: false });

	res.json({
		msg: 'Usuario eliminado',
		user,
	});
};

module.exports = {
	userRegister,
	userLogin,
	getUsers,
	deleteUser,
};
