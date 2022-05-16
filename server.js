/* variables */
require('dotenv').config()
const express = require("express");
const app = express();



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




/* connect database */
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



const gebruikerArray = [
    {
        "naam": "Chelsey",
       
        preferencesArray:[]
    }
    
]




// const data = [
//     {
//         stad: 'Amsterdam',
//         budget: 550
//     }
// ];



/* filter route */
app.get('/', (req, res) => {
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