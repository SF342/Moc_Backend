var express = require('express');
var router = express.Router();
var controller = require('../controllers/ProductController');

router.get('/:pid', controller.getProduct)
router.get('/lastprice/:pid', controller.getProductLastPrice)

module.exports = router;