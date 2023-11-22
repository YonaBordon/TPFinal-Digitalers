const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middleware');

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

router.post('/', [validateJWT, validateProduct], addProduct);

router.put('/:id', [validateJWT], updateProduct);

router.delete('/:id', [validateJWT], deleteProduct);

module.exports = router;
