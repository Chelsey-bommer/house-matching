/*** variables ***/
require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
let db = null;

/*** Middleware ***/
/*****************/
app.use("/static", express.static("./static"));
app.use("/css", express.static("./static/css"));
app.use("/img", express.static("./static/img"));
app.use("/js", express.static("./static/js"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect met database */
async function connectDB() {
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

  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}

app.get("/filter", (req, res) => {
  res.render("pages/filter");
});

//{kosten: {$lte: budget }}
//$and: [{stad}, {kosten: {$lte: budget }}]

/* filter route POST */
app.post("/resultaten", async (req, res) => {
  const stad = req.body.stad;
  const budget = req.body.budget;
  

  const dbHouses = await db
    .collection("huizen")
    .find({ $and: [{stad}, {kosten: {$lte: budget }}]  }, {})
    .toArray();
  const houses = JSON.stringify(dbHouses);
  console.log(houses);

  res.render("pages/results", {
    stad: req.body.stad,
    budget: req.body.budget,
    houses: houses,
  });
});

/* 404 route */
app.use(function (req, res) {
  res.status(404).render("pages/error");
});

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}`);

  connectDB().then(console.log("Er is een connectie met de Database"));
});
