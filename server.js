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

//console.log(houses)
  //   .map( function() { return {stad}, {huizenname} } ).toArray()

/* filter route POST */
app.post("/resultaten", async (req, res) => {
  
  const stad = req.body.stad;
  const budget = req.body.budget;
  
  await db.collection("user").insertOne({stad, budget}, {});

  const dbHouses = await db
    .collection("huizen")
    .findOne({ $and: [{stad}, {kosten: {$lte: budget }}]}, {projection:{ _id: 0, name:1}}) 
  let houses = JSON.stringify(dbHouses);
  houses = houses.replace(/[{}]/g, '');
  houses = houses.replace(/[""]/g, '');
  houses = houses.slice(5);

  res.render("pages/results", {
    stad: req.body.stad,
    budget: req.body.budget,
    houses: houses
    
  });
  
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
