var express = require('express');
var router = express.Router();
var controller = require('../controllers/FavoriteController');

router.post('/', controller.createFavorite)
router.get('/:id', controller.getFavorite)
router.put('/', controller.updateFavorite)
router.delete('/:id', controller.deleteFavorite)


module.exports = router;

