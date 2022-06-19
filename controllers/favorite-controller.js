const express = require('express')
const router = express.Router()
const { ObjectId } = require("mongodb");

const { House } = require("../models/schemas");

const likeHouse = async (req, res) => {
  await House.updateOne(
    { _id: ObjectId(req.body.favorite) },
    { $set: { favorited: true } }
  );
};

const unlikeHouse = async (req, res) => {
  await House.updateOne(
    { _id: ObjectId(req.body.favorite) },
    { $set: { favorited: false } }
  );
};

module.exports = {
  likeHouse,
  unlikeHouse,
};
