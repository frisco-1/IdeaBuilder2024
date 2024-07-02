const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const { Schema } = require('mongoose')

router.get('/business_cards', async (req, res) => {
 const businessCards = schemas.BusinessCards

 try {
    const bsData = await businessCards.find({}).exec();
    res.json(bsData); // Use res.json to automatically set the Content-Type to application/json
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router