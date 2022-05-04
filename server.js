const express = require("express");

const app = express();
const port = 3000;

/* Static file */
app.use(express.static('static'));

// set the view engine to ejs
app.set('view engine', 'ejs');


const user = {
    firstName: 'Chelsey',
    lastName: 'Bommer',
}

const houses = {
    housePrice: 500,
    houseRoom: 3
}



/* de home van de server. */
app.get('/', (req, res) => {
    res.render('pages/index', {user:user}) 
})

/* filter route */
app.get('/filter', (req,res) => {
    res.render('pages/filter');
})

/* Resultaten route */
app.get('/results', (req,res) => {
    res.render('pages/results');
})

/* 404 route */
app.use(function(req, res){
    res.status(404).send("Error 404: file not found");
});


/* Hier console log je met de variable port van hierboven */
app.listen(port, () => {
    console.log(`Webserver running on port localhost:${port}`);
})