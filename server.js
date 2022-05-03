const express = require("express");

const app = express();
const port = 3000;

/* Static file */
app.use(express.static('static'));



/* '/' is de home van je server. */
app.get('/', (req,res) => {
    res.send("Hello world")
})

/* Hier console log je met de variable port van hierboven */
app.listen(port, () => {
    console.log(`Webserver running on port localhost:${port}`);
})