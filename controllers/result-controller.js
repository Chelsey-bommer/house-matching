const express = require('express');
const router = express.Router();
const database = require('../config/db')
const alertHouses = require('alert')
const alert = require('alert')


/*** Filter route POST **/
router.post('/resultaten', async (req, res) => {
 
    /** Maak variabelen  **/
    const stad = req.body.stad || req.body.textfield1
    const budgetString = req.body.budget
    const budget = Number(budgetString)
   
    /** Stuur userdata naar db  **/
    await db.collection('user').insertOne({ stad, budget }, {})
   
    /** Haal huizen op uit db**/
    const houses = await db
      .collection('houses')
      .findOne(
        { $and: [{ stad }, { prijs: { $lte: budget } }]}
      )
   
      console.log(houses);
   
    try {
      if (houses == null) {
        alert('Dit huis bestaat niet, probeer andere voorkeuren')
        alertHouses
   
        /** render pagina **/
        res.render('pages/filter')
      }
      else {
   
        /** render pagina **/
        res.render('pages/results', { 
          stad: req.body.stad || req.body.textfield1,
          budget: req.body.budget,
          houses 
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  })

module.exports = router
