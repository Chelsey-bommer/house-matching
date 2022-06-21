const express = require('express')
const router = express.Router();
const results = require('../controllers/result-controller')
const userController = require('../controllers/user-controller')

/**  Update route GET **/
router.get('/update', userController.isNotAuthenticated, results.getPreferences)

router.post('/resultaten', results.searchHouses) 
router.post('/resultaten', results.searchHouses) 


module.exports = router;