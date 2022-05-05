const express = require("express");

const app = express();
const port = 3000;

/* Static file */
app.use(express.static('static'));
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/img', express.static(__dirname + 'static/img'))

// set the view engine to ejs
app.set('view engine', 'ejs');


const user = {
    firstName: 'Chelsey',
    lastName: 'Bommer',
}




/* filter route */
app.get('/', (req, res) => {
    res.render('pages/filter', {user:user}) 
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
app.listen(port, () => {
    console.log(`Webserver running on port localhost:${port}`);
})