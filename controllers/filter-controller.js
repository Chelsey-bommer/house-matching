const express = require('express');
const router = express.Router();


/** Filter route **/
router.get('/filter', (req, res) => {
    res.render('pages/filter')
})

module.exports = router