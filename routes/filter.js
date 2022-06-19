const express = require('express')
const router = express.Router();
const filter = require('../controllers/filter-controller')

/** Home route **/
router.get('/filter', filter) 

module.exports = router;