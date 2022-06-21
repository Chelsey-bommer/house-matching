const { application } = require('express');
const express = require('express')
const router = express.Router()
const { ObjectId } = require("mongodb");

const { House } = require("../models/schemas");

const addHouse = async (req, res) => {
    let { prijs, naam, stad } = req.body;
    
    /** Check if all fields are filled in **/
    if (!prijs || !naam || !stad) {
      console.log(`Vul gegevens in.`)
    } 
  
    const duplicate = await House.findOne({naam: naam}).exec();
    if (duplicate) return res.status(409); //Conflict
  
    try { 
        //create user and store
        await House.create ({
            'prijs': prijs,
            'naam': naam,
            'stad': stad
        }); 
  
        res.redirect('/login');
    } catch (err) {
        res.status(500).json({'Message': err.message});
    }
}

module.exports = {
    addHouse
}