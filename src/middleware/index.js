const validateFields = require('./validateFields');
const validateJWT = require('./validateJWT');
const validateRole = require('./validateRole');

module.exports = {
	...validateFields,
	...validateJWT,
	...validateRole,
};
