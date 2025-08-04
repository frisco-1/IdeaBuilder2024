import express from 'express';
import schemas from '../models/schemas.js'; // ✅ must use .js extension in ESM

const router = express.Router();

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
  'keywords',
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
  'printed_vinyl_laminated',
  'realtor_signs',
  'coroplast_signs',
  'a_frame',
  'arrow_signs',
  'single_arm_sign_post',
  'roll_up_banners',
  'custom_flags',
  'table_covers',
  'magnetic_signs',
  'max_metal_laminated',
  'foam_signs_laminated',
  'coroplast_signs_laminated'
];

routes.forEach((route) => {
  const modelName =
    route.charAt(0).toUpperCase() +
    route.slice(1).replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  router.get(`/${route}`, createGetRoute(modelName));
});

// SEARCH API
router.get('/api/search', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const searchResults = await schemas.Keywords.find({
      keyword: { $regex: query, $options: 'i' }
    }).select('productName productLink');

    res.json(searchResults);
  } catch (err) {
    console.error('Error occurred while searching:', err);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
});

export default router;
