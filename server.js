/** Variabelen **/
const express = require('express')
const session = require('express-session')
const app = express()
const compression = require('compression')
const fetch = require('node-fetch')
const { MongoClient, ServerApiVersion } = require('mongodb')
const { ObjectId } = require('mongodb')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const passport = require('passport')
const alertHouses = require('alert')
const alert = require('alert')

require('dotenv').config();
connectDB().then(console.log(`Connectie met database succesvol op`))

const userRouter = require('./routes/users')
const homeRouter = require('./routes/home')
const filterRouter = require('./routes/filter')
const favoriteRouter = require('./routes/favorites')
const resultsRouter = require('./routes/result')
const errorRouter = require('./routes/error')

/** Middleware **/
app.use(compression({ 
  level: 6, 
  threshold: 0,
  filter: (req, res) => {
    if (req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req, res)
  }
}))
app.use('/static', express.static('./static'))
app.use('/css', express.static('./static/css'))
app.use('/img', express.static('./static/img'))
app.use('/js', express.static('./static/js'))
app.set('view engine', 'ejs')

app.use( session({
  secret: "sessionSecret",
  resave: false,
  saveUninitialized: true
}))

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** ROUTES **/
app.use(homeRouter)

/** Filter route **/
app.use(filterRouter)

/*** Result route POST **/
app.use(resultsRouter)

/*** Favorite route POST **/
app.use(favoriteRouter)

/*** User route POST **/
app.use(userRouter)

/* 404 route */
app.use(errorRouter)

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}`)

})