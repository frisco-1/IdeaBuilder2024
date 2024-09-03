const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
const mySchemas = require('../models/schemas');

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

// SEARCH API
router.get('/api/search', async (req, res) => {
  const query = req.query.query; // Get the search query from the request

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const searchResults = [];

    // Loop through each schema and search for the query in the name field
    for (const [collectionName, model] of Object.entries(schemas)) {
      console.log(`Searching in collection: ${collectionName}`); // Debugging log
      const results = await model.find({
        name: { $regex: query, $options: 'i' } // Search case-insensitive for the query in the 'name' field
      }).select('name code image'); // Select the fields you want to return

      console.log(`Found ${results.length} results in collection: ${collectionName}`); // Debugging log

      searchResults.push(...results.map(result => ({
        collection: collectionName,
        ...result.toObject(),
      })));
    }

    res.json(searchResults);
  } catch (err) {
    console.error('Error occurred while searching:', err);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
});

module.exports = router;