const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

router.get('/products', adminController.getProducts);


// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;