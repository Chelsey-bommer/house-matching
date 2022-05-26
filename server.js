/*** variables ***/
require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
let db = null;

/*** Middleware ***/
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

/*** Routes ***/
app.get("/filter", (req, res) => {
  res.render("pages/filter");
});


/* filter route POST */
app.post("/resultaten", async (req, res) => {
  
  const stad = req.body.stad;
  const budget = req.body.budget;
  
  await db.collection("user").insertOne({stad, budget}, {});

  const dbHouses = await db
    .collection("huizen")
    .findOne({ $and: [{stad}, {kosten: {$lte: budget }}]}, {projection:{ _id: 0, name:1}})
     
  let housesName = JSON.stringify(dbHouses);
  housesName = housesName.replace(/[{}]/g, '');
  housesName = housesName.replace(/[""]/g, '');
  housesName = housesName.replace(/[":"]/g, ': ');

  
  const dbKosten = await db
    .collection("huizen")
    .findOne({ $and: [{stad}, {kosten: {$lte: budget }}]}, {projection:{ _id: 0, kosten:1}})
     
  let housesKosten = JSON.stringify(dbKosten);
  housesKosten = housesKosten.replace(/[{}]/g, '');
  housesKosten = housesKosten.replace(/[""]/g, '');
  housesKosten = housesKosten.replace(/[":"]/g, ': €');

  const dbSteden = await db
   .collection("huizen")
   .findOne({ $and: [{stad}, {kosten: {$lte: budget }}]}, {projection:{ _id: 0, stad:1}})
   
  let housesStad = JSON.stringify(dbSteden);
  housesStad = housesStad.replace(/[{}]/g, '');
  housesStad = housesStad.replace(/[""]/g, '');
  housesStad = housesStad.replace(/[":"]/g, ': ');


  res.render("pages/results", {
    stad: req.body.stad,
    budget: req.body.budget,
    housesName, housesKosten, housesStad
    
  });
  
});

/* UPDATE ROUTE */
app.get("/update", async (req, res) => {

  const stad = req.body.stad;
  const budget = req.body.budget;

  const current = await db
   .collection("user")
   .findOne({}, {projection:{ _id: 0}})
  let housesCurrent = JSON.stringify(current);
  housesCurrent = housesCurrent.replace(/[{}]/g, '');
  housesCurrent = housesCurrent.replace(/[""]/g, '');

  res.render("pages/update", {
    stad: req.body.stad,
    budget: req.body.budget,
    housesCurrent
  });

  db.collection("user").updateMany({}, { $set: {stad: {stad}, budget: {budget}}}) 
});

/* 404 route */
app.use(function (req, res) {
  res.status(404).render("pages/error");
});

/* Hier console log je met de variable port van hierboven */
app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port localhost:${process.env.PORT}`);

  connectDB().then(console.log("Connectie met database succesvol"));
});
