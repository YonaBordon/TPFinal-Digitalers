const { Administrator } = require('../models');

async function validateRoleRender(req, res, next) {
	if (!req.user) {
		return next();
	}

	const { _id } = req.user;

	if (!_id) {
		return next();
	}

	const admin = await Administrator.findOne({ user: _id });
	if (admin) {
		req.isAdmin = true;
	}

	next();
}

module.exports = {
	validateRoleRender,
};
