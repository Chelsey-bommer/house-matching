const express = require('express');
const router = express.Router();
const database = require('../config/db')

/** Filter route **/
router.get('/resultaten', (req, res) => {
    res.render('pages/results')
})

/*** Filter route POST **/
router.post('/resultaten', async (req, res) => {

    /** Maak variabelen  **/
    const stad = req.body.stad || req.body.textfield1
    const budgetString = req.body.budget
    const budget = Number(budgetString)

    /** Stuur userdata naar db  **/
    await db.collection('user').insertOne({ stad, budget }, {})

    /** Haal huizen op uit db**/
    const dbHouses = await db
        .collection('houses')
        .findOne(
            { $and: [{ stad }, { prijs: { $lte: budget } }] },
            { projection: { _id: 0, naam: 1, prijs: 1, stad: 1 } }
        )
    let houses = JSON.stringify(dbHouses)
    houses = houses.replace(/[{}]|[""]/g, '')
    houses = houses.replace(/[':']/g, ': ')
    houses = houses.replace(/[',']/g, ', ')

    try {
        if (dbHouses == null) {
            alert('Dit huis bestaat niet, probeer andere voorkeuren')
            alertHouses

            /** render pagina **/
            res.render('pages/filter', {
                stad: req.body.stad || req.body.textfield1,
                budget: req.body.budget,
                houses
            })
        }
        else {
            /** Haal huizen op uit db**/
            const dbHouses = await db
                .collection('houses')
                .findOne(
                    { $and: [{ stad }, { prijs: { $lte: budget } }] },
                    { projection: { _id: 0, naam: 1, prijs: 1, stad: 1 } }
                )
            let houses = JSON.stringify(dbHouses)
            houses = houses.replace(/[{}]|[""]/g, '')
            houses = houses.replace(/[':']/g, ': ')
            houses = houses.replace(/[',']/g, ', ')

            /** render pagina **/
            res.render('pages/results', {
                stad: req.body.stad || req.body.textfield1,
                budget: req.body.budget,
                houses
            })
        }
    }
    catch {
        console.log('Voer de goede waarden in')
    }
})

module.exports = router, database
