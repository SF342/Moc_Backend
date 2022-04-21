var express = require('express');
var router = express.Router();
var controller = require('../controllers/ProductController');

router.get('/:id', controller.getFavorite)

module.exports = router;