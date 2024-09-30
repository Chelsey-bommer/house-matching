const express = require('express');
const router = express.Router();
const database = require('../config/db')
const alertHouses = require('alert')
const alert = require('alert')

const { House } = require('../models/schemas');
const { User } = require('../models/schemas');




/*** Filter route POST **/
const searchHouses = async (req, res) => {
 
    /** Maak variabelen  **/
    const stad = req.body.stad || req.body.textfield1
    const budgetString = req.body.budget
    const budget = Number(budgetString)
    const user = req.user;

    /** Stuur voorkeuren naar ingelogde user  **/
    await User.updateOne({username: user.username},{
      $set: { preferences: {
        stad: stad,
        budget: budget
      }} 
    }).exec();

    const currentUser = await User.findOne({username: user.username},{}).exec();
    const updatedStad = currentUser.preferences.stad;
    const updatedbudget = currentUser.preferences.budget
    const Allhouses = await House.find();
    
    
   
    /** Haal huizen op uit db**/
    const houses = await House.findOne({ stad: updatedStad,  prijs: { $lte: updatedbudget }}, {})
    
   
    try {
      
      if (houses == null) {
        alert('Dit huis bestaat niet, probeer andere voorkeuren')
        alertHouses
      
        /** render pagina **/
        res.render('pages/login' )
          
      }
      else {
        /** render pagina **/
        res.render('pages/results', { 
          stad,
          budget,
          houses 
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const getPreferences = async (req, res) => {
 
    /** Get session user variable  **/
    const user = req.user;

    /** Find database user matching to session user  **/
    const currentUser = await User.findOne({username: user.username},{}).exec();
   
    /** Render database data  **/
    res.render('pages/update', { 
          currentUser 
    })
  }

  module.exports = {
    searchHouses, 
    getPreferences,
    
}
