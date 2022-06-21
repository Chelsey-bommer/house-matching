const express = require('express')
const router = express.Router();
const filter = require('../controllers/filter-controller')
const userController = require('../controllers/user-controller')

/** Home route **/
router.get('/filter', userController.isNotAuthenticated,filter) 

module.exports = router;