const express = require('express')
const router = express.Router();

router.use(function (req, res) {
    res.status(404).render('pages/error')
})

module.exports = router;