const express = require('express')
const router = express.Router();
const results = require('../controllers/result-controller')

router.post('/resultaten', results) 


module.exports = router;