require('dotenv').config()
const express = require('express')
const router = express.Router();

const CRUD = require(`../controllers/crud-controller`);

const { User } = require('../models/schemas');
const { House } = require('../models/schemas');

/** Render pages **/
router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

/** Register user POST **/
router.post("/register", async (req, res) => {
  let { email, password } = req.body;
    
  /** Check if all fields are filled in **/
  if (!email || !password) {
    console.log(`Vul gegevens in.`)
  } 

  const duplicate = await User.findOne({email: email}).exec();
  if (duplicate) return res.status(409); //Conflict

  try {
    // const hasedPwd = await bcrypt.hash(password, 10); use this const on the create line after bcrypt is installed

    //create user and store
    const result = await User.create ({
        'email': email,
        'password': password
    });

    res.redirect('/login');
  } catch (err) {
    res.status(500).json({'Message': err.message});
  }
})

module.exports = router;