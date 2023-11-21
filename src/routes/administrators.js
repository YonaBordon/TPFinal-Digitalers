const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateRole } = require('../middleware');
const { addAdmin, deleteAdmin } = require('../controllers/administrator');
const router = Router();

router.post('/admin/:id', [validateJWT, validateRole], addAdmin);

router.delete('/admin/:id', [validateJWT, validateRole], deleteAdmin);


module.exports = router;
