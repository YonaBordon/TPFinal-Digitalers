const { Router } = require('express');
const { renderAllProducts, renderPaginatedProducts } = require('../controllers/products');

const router = Router();

// with pagination
router.get('/:page?', renderPaginatedProducts);

module.exports = router;
