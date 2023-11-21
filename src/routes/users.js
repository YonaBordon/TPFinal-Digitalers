const { Router } = require('express');
const { check } = require('express-validator');

const { userRegister, userLogin, getUsers, deleteUser } = require('../controllers/users');
const { validateFields, validateJWT, validateRole } = require('../middleware');
const router = Router();

router.post(
	'/register',
	[
		check('username', 'El usuario es requerido').not().isEmpty(),
		check('email', 'El email es requerido').isEmail(),
		check('password', 'La contraseña es requerida').not().isEmpty(),
		validateFields,
	],
	userRegister,
);

router.post(
	'/login',
	[
		check('email', 'El email es requerido').isEmail(),
		check('password', 'La contraseña es requerida').not().isEmpty(),
		validateFields,
	],
	userLogin,
);

router.get('/', getUsers);

router.delete('/:id', [validateJWT, validateRole], deleteUser);

module.exports = router;
