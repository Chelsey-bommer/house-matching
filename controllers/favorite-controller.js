const { application } = require('express');
const express = require('express')
const router = express.Router()
const { ObjectId } = require("mongodb");

const { House } = require("../models/schemas");

const likeHouse = async (req, res) => {
  await House.updateOne(
    { _id: ObjectId(req.body.favorite) },
    { $set: { favorited: true } }
  );

  res.redirect('/filter');
};

const unlikeHouse = async (req, res) => {
  await House.updateOne(
    { _id: ObjectId(req.body.favorite) },
    { $set: { favorited: false } }
  );

  res.redirect('/filter');
};

module.exports = {
  likeHouse,
  unlikeHouse,
};
