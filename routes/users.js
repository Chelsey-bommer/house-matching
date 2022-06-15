require('dotenv').config()
const express = require('express')
const router = express.Router();

const CRUD = require(`../controllers/crud-controller`);

const { Preference } = require('../models/schemas');
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
  let { email, password, city } = req.body;
  const budgetString = req.body.budget
  const budget = Number(budgetString)
    
  /** Check if all fields are filled in **/
  if (!email || !password) {
    console.log(`Vul gegevens in.`)
  } 

  const duplicate = await User.findOne({email: email}).exec();
  if (duplicate) return res.status(409); //Conflict

  try {
    // const hasedPwd = await bcrypt.hash(password, 10); use this const on the create line after bcrypt is installed

    //create preferences and store into user
    const preferences = await Preference.create ({
        'city': city,
        'budget': budget
    });
    
    console.log(preferences);

    //create user and store
    const result = await User.create ({
        'email': email,
        'password': password,
        'preferences': {preferences}
    });

    console.log(result);

    res.redirect('/login');
  } catch (err) {
    res.status(500).json({'Message': err.message});
  }
})

module.exports = router;