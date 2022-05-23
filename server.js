/* variables */
require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");

/* Middleware */
app.use("/static", express.static("./static"));
app.use("/css", express.static("./static/css"));
app.use("/img", express.static("./static/img"));
app.use("/js", express.static("./static/js"));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect met database */
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://" +
  process.env.DB_USERNAME +
  ":" +
  process.env.DB_PASS +
  "@" +
  process.env.DB_HOST +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const data = [
    {
        title: 'redemption',
        story: 'a fantastic movie'
        
    }
]

/* filter route */
app.get("/filter", (req, res) => {
  res.render("pages/filter");
});


/* filter route POST */
app.post("/resultaten", (req, res) => {
  console.log(req.body.stad);
  console.log(req.body.budget);

  res.render("pages/results", {
    stad: req.body.stad,
    budget: req.body.budget,
  });
});

/* Resultaten route */
app.get("/results", (req, res) => {
  res.render("pages/results");
});

/* 404 route */
app.use(function (req, res) {
  res.status(404).render("pages/error");
});

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}}`);
});
