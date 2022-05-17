/* variables */
require('dotenv').config()
const express = require("express");
const app = express();
const fetch = require("node-fetch");




/* Static files */
app.use("/static", express.static('./static'));
app.use('/css', express.static('./static/css'));
app.use('/img', express.static('./static/img'));
app.use('/js', express.static('./static/js'));

/* set the view engine to ejs */
app.set('view engine', 'ejs');

/* express body parser */
app.use(express.json());
app.use(express.urlencoded({extended:true}));




/* Connect met database */
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: °, Longitude: ${longitude} °`;
    }

  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}
  



/* Lijst van steden dichtbij API */
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': process.env.API_HOST,
		'X-RapidAPI-Key': process.env.API_KEY 
	}
};

fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude} /nearbyCities?radius=100&minPopulation=50000&distanceUnit=km`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



/* filter route */
app.get('/filter', (req, res) => {
    res.render('pages/filter',) 
}) 


/* filter route POST */
app.post('/resultaten', (req, res) => {
    console.log(req.body.stad);
    console.log(req.body.budget);
   
    
    
   res.render('pages/results', {
       stad: req.body.stad,
       budget: req.body.budget
   }); 
})


/* Resultaten route */
app.get('/results', (req,res) => {
    res.render('pages/results');
})

/* 404 route */
app.use(function(req, res){
    res.status(404).render('pages/error');
});


/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
    console.log(`Webserver running on port localhost:${process.env.PORT}}`);
})