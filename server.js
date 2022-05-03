const express = require("express");

const app = express();
const port = 3000;

/* Static file */
app.use(express.static('static'));



/* de home van de server. */
app.get('/', (req,res) => {
    res.send("Hello world")
})

/* filter route */
app.get('/filter', (req,res) => {
    res.send("Hello filter!")
})

/* Resultaten route */
app.get('/resultaten', (req,res) =>{
    res.send("Hello resultaten")
})

/* 404 route */
app.use(function(req, res){
    res.status(404).send("Error 404: file not found");
});


/* Hier console log je met de variable port van hierboven */
app.listen(port, () => {
    console.log(`Webserver running on port localhost:${port}`);
})