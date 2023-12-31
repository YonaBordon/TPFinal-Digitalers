const { Router } = require('express');
const { renderAllProducts } = require('../controllers/products');
const { validateTokenRender } = require('../middleware/validateTokenRender');
const { validateRoleRender } = require('../middleware/validateRoleRender');

const router = Router();

router.get('/', [validateTokenRender, validateRoleRender], renderAllProducts);

router.get('/login', (req, res) => {
	const isLoggedIn = !!req.cookies.token;
	res.render('login', {
		title: 'Login',
		name: 'Login',
		isLoggedIn,
	});
});

router.get('/register', (req, res) => {
	const isLoggedIn = !!req.cookies.token;
	res.render('register', {
		title: 'Register',
		name: 'Register',
		isLoggedIn,
	});
});

module.exports = router;
