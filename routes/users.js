const express = require('express');
const router = express.Router()

const userController = require('../controllers/user-controller')

/** Render pages **/
router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

/** auth check **/
router.get('/checkauth', userController.isAuthenticated)

/** Register user POST **/
router.post('/register', userController.registerUser)
router.post('/login', userController.authenticateUser)

module.exports = router;