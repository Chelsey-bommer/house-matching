const { application } = require('express');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

const { User } = require('../models/schemas');

const registerUser = async (req, res) => {
    let { username, password } = req.body;
    
    /** Check if all fields are filled in **/
    if (!username || !password) {
      console.log(`Vul gegevens in.`)
    } 
  
    const duplicate = await User.findOne({username: username}).exec();
    if (duplicate) return res.status(409); //Conflict
  
    try {
       const hasedPwd = await bcrypt.hash(password, 10);
  
      //create preferences and store into user
  
      //create user and store
      await User.create ({
          'username': username,
          'password': hasedPwd,
          preferences: {
            stad: null,
            budget: null
          }
      });
  
  
      res.redirect('/login');
    } catch (err) {
      res.status(500).json({'Message': err.message});
    }
};

const authenticateUser = async (req, res, next) => {

  passport.authenticate('local', {
    successRedirect: '/filter',
    failureRedirect: '/login'
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

const isNotAuthenticated = (req,res,next) => {
  if(!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

const isAuthenticated = (req,res,next) => {
  if(req.user) {
    res.redirect('/filter');
  } else {
    next();
  }
}

module.exports = {
    registerUser,
    authenticateUser,
    logoutUser,
    isAuthenticated,
    isNotAuthenticated
};
