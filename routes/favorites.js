const express = require('express');
const router = express.Router();

const favoriteController = require(`../controllers/favorite-controller`);

router.post('/favorite', favoriteController.likeHouse);
router.post('/unfavorite', favoriteController.unlikeHouse);

module.exports = router;