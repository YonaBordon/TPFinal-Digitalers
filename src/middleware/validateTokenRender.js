const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function validateTokenRender(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
			return next();
	}

	try {
			const { uid } = jwt.verify(token, process.env.SECRET_KEY);
			const user = await User.findById(uid);

			if (user) {
					req.user = user;
			}
	} catch (err) {
			console.error(err);
			
	}

	next();
}

module.exports = {
	validateTokenRender,
};
