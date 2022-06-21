const express = require('express');
const router = express.Router()

const userController = require('../controllers/user-controller')

/** Render pages **/
router.get('/login', userController.isAuthenticated,(req, res) => {
    res.render('pages/login');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});


/** Register user POST **/
router.post('/register', userController.registerUser)
router.post('/login', userController.authenticateUser)
router.post('/logout', userController.logoutUser)

module.exports = router;