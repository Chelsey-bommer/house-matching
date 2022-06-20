const express = require('express')
const router = express.Router();
const results = require('../controllers/result-controller')

/**  Update route GET **/
router.get('/update', results.getPreferences)

router.post('/resultaten', results.searchHouses) 
router.post('/resultaten', results.searchHouses) 


module.exports = router;