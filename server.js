

/** Variabelen **/
require('dotenv').config()
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const { MongoClient, ServerApiVersion } = require('mongodb')
const { ObjectId } = require('mongodb')

let db = null

const mongoose = require('mongoose')

const userRouter = require('./routes/users');

/** Middleware **/
app.use('/static', express.static('./static'))
app.use('/css', express.static('./static/css'))
app.use('/img', express.static('./static/img'))
app.use('/js', express.static('./static/js'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRouter);

/* Connect met database */
async function connectDB() {
  const uri =
    'mongodb+srv://' +
    process.env.DB_USERNAME +
    ':' +
    process.env.DB_PASS +
    '@' +
    process.env.DB_HOST +
    '/' +
    process.env.DB_NAME +
    '?retryWrites=true&w=majority'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  })

  try {
    await client.connect()
    mongoose.connect(uri);
    db = client.db(process.env.DB_NAME)
  } catch (error) {
    throw error
  }
}


/** ROUTES **/

/** Home route **/
app.get('/', (req, res) => {
  res.render('pages/index')
})

/** Filter route **/
app.get('/filter', (req, res) => {
  res.render('pages/filter')
})


/*** Filter route POST **/
app.post('/resultaten', async (req, res) => {

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

  if (dbHouses == null) {
  
    res.render('pages/filter', {
      
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
})

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


 if (dbHouses == null) {
  /* Wanneer het huis niet bestaat */
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
})

/* 404 route */
app.use(function (req, res) {
  res.status(404).render('pages/error')
})

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}`)

  connectDB().then(console.log('Connectie met database succesvol'))
})


