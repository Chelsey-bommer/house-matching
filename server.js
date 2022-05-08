/* variables */
const express = require("express");
const app = express();
const port = 3000;


/* Static files */
app.use("/static", express.static('./static/'));
app.use('/css', express.static('./static/css'));
app.use('/img', express.static('./static/img'));
app.use('/js', express.static('./static/js'));


// set the view engine to ejs
app.set('view engine', 'ejs');



/* test variable */
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