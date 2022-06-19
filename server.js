/** Variabelen **/
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const { MongoClient, ServerApiVersion } = require('mongodb')
const { ObjectId } = require('mongodb')
const connectDB = require('./config/db')
const mongoose = require('mongoose')

require('dotenv').config();
connectDB().then(console.log(`Connectie met database succesvol op`))




const userRouter = require('./routes/users')
const homeRouter = require('./routes/home')
const filterRouter = require('./routes/filter')
const resultsRouter = require('./routes/result')
const errorRouter = require('./routes/error')

/** Middleware **/
app.use('/static', express.static('./static'))
app.use('/css', express.static('./static/css'))
app.use('/img', express.static('./static/img'))
app.use('/js', express.static('./static/js'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter);

const alertHouses = require('alert')
const alert = require('alert')

/** ROUTES **/
app.use(homeRouter)

/** Filter route **/
app.use(filterRouter)

/*** Filter route POST **/
app.use(resultsRouter)

/**  Update route GET **/
app.get('/update', async (req, res) => {

  /** Haal user data uit db**/
  const current = await db
    .collection('user')
    .findOne({}, { projection: { _id: 0 } })
  let housesCurrent = JSON.stringify(current)
  housesCurrent = housesCurrent.replace(/[{}]|[""]/g, '')
  housesCurrent = housesCurrent.replace(/[':']/g, ': ')
  housesCurrent = housesCurrent.replace(/[',']/g, ', ')

  /** render pagina **/
  res.render('pages/update', {
    stad: req.body.stad || req.body.textfield1,
    budget: req.body.budget,
    housesCurrent
  })
})

/* Update route POST */
app.post('/update', async (req, res) => {

  /** Haal user data op uit db **/
  const current = await db
    .collection('user')
    .findOne({}, { projection: { _id: 0 } })
  let housesCurrent = JSON.stringify(current)
  housesCurrent = housesCurrent.replace(/[""]/g, '')

  /** Render pagina **/
  res.render('pages/update', {
    housesCurrent
  })
})

/** Resultaten update route POST **/
app.post('/updateresultaten', async (req, res) => {

  /** Maak variabelen  **/
  const stad = req.body.stad || req.body.textfield1
  const budgetString = req.body.budget
  const budget = Number(budgetString)


  /** Update user data in db  **/
  db.collection('user').updateMany({}, { $set: { stad, budget } })

  /** Haal huizen op uit db**/
  const dbHouses = await db
    .collection('houses')
    .findOne(
      { $and: [{ stad }, { prijs: { $lte: budget } }] },
      { projection: { _id: 0, naam: 1, prijs: 1, stad: 1 } }
    )

  try {
    if (dbHouses != null) {
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

    else {
      /* Wanneer het huis niet bestaat */
      alert('Dit huis bestaat niet, probeer andere voorkeuren')
      alertHouses

      const current = await db
        .collection('user')
        .findOne({}, { projection: { _id: 0 } })
      let housesCurrent = JSON.stringify(current)
      housesCurrent = housesCurrent.replace(/[""]|[{}]/g, '')
      housesCurrent = housesCurrent.replace(/[':']/g, ': ')
      housesCurrent = housesCurrent.replace(/[',']/g, ', ')

      res.render('pages/update', {
        housesCurrent,
        current
      })
    }
  }

  catch {
    console.log('Voer de goede waarden in')
  }
})


/* 404 route */
app.use(errorRouter)

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}`)

})


