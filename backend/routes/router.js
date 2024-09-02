const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

// Generic route handler for fetching data from different collections
const createGetRoute = (modelName) => {
  return async (req, res) => {
    const model = schemas[modelName];

    if (!model) {
      console.error(`Model not found: ${modelName}`);
      return res.status(404).send(`Model not found: ${modelName}`);
    }

    try {
      const data = await model.find({}).exec();
      res.json(data);
    } catch (error) {
      console.error(`Error fetching data for model ${modelName}:`, error);
      res.status(500).send(error.message);
    }
  };
};


// Define routes dynamically
const routes = [
  'business_cards',
  'flyers',
  'door_hangers',
  'envelopes',
  'letterheads',
  'invoices',
  'pocket_folders',
  'recordatorios',
  'booklets',
  'tickets',
  'invitations',
  'vinyl_stickers',
  'printed_vinyl_laminated'
];

routes.forEach(route => {
  const modelName = route.charAt(0).toUpperCase() + route.slice(1).replace(/_([a-z])/g, g => g[1].toUpperCase());
  router.get(`/${route}`, createGetRoute(modelName));
});




// router.get('/tickets', async (req, res) => {
//  const tickets = schemas.Tickets

//  try {
//     const ticketData = await tickets.find({}).exec();
//     res.json(ticketData); // Use res.json to automatically set the Content-Type to application/json
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// })

// router.get('/booklets', async (req, res) => {
//   const booklets = schemas.Booklet

//   try {
//     const bookletData = await booklets.find({}).exec();
//     res.json(bookletData); // Use res.json to automatically set the Content-Type to application/json
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// })

module.exports = router;
