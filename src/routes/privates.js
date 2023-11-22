const { Router } = require('express');
const { renderAllProducts, renderPaginatedProducts } = require('../controllers/products');
const { validateTokenRender } = require('../middleware/validateTokenRender');
const { validateRoleRender } = require('../middleware/validateRoleRender');

const router = Router();

router.use(validateTokenRender);
router.use(validateRoleRender);

router.get('/users/:page?', (req, res) => {
	const isAdmin = req.isAdmin || false;
	const isLoggedIn = !!req.cookies.token;
	if (!isAdmin) {
		return res.redirect('/');
	}

	res.render('manageUsers', {
		title: 'Users',
		name: 'Users',
		isLoggedIn,
		isAdmin,
	});
});

router.get('/:page?', renderPaginatedProducts);
module.exports = router;
