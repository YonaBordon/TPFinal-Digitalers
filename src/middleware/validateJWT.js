const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async (req, res, next) => {
	let token = req.header('Access-Token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición',
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(uid);

		if (!user) {
			return res.status(401).json({
				msg: 'Token no válido - usuario no existe en DB',
			});
		}

		if (!user.status) {
			return res.status(401).json({
				msg: 'Token no válido - usuario con estado: false',
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Token no válido',
		});
	}
};

module.exports = {
	validateJWT,
};
