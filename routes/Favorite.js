var express = require('express');
var router = express.Router();
var controller = require('../controllers/FavoriteController');

router.post('/', controller.createFavorite)
router.get('/:id', controller.getFavorite)
router.put('/', controller.updateFavorite)
router.delete('/:user_id/:_id', controller.deleteFavorite)
router.get('/productDetail/:id', controller.getProductDetail)

router.post('/updatedata', controller.createFavoriteData)


module.exports = router;

