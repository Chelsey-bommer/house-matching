const express = require('express')
const router = express.Router();
const huis = require('../controllers/home-controller')

/** Home route **/
router.get('/', huis) 

module.exports = router;