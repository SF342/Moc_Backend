var express = require('express');
var router = express.Router();
var controller = require('../controllers/ProductController');

router.get('/', controller.getProduct)
router.get('/lastprice', controller.getProductLastPrice)

module.exports = router;