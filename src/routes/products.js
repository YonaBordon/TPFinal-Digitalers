const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateRole } = require('../middleware');

const {
	addProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} = require('../controllers/products');
const validateProduct = require('../middleware/validateProduct');

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', [validateJWT, validateRole, validateProduct], addProduct);

router.put('/:id', [validateJWT, validateRole], updateProduct);

router.delete('/:id', [validateJWT, validateRole], deleteProduct);

module.exports = router;
