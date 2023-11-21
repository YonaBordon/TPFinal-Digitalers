const { Administrator } = require('../models');

const validateRole = async (req, res, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: 'Se quiere verificar el role sin validar el token primero',
		});
	}

	const { _id } = req.user;
	const admin = await Administrator.findOne({ user: _id });

	if (!admin) {
		return res.status(401).json({
			msg: 'No tiene permisos para realizar esta acción',
		});
	}

	next();
};

module.exports = {
	validateRole,
};
