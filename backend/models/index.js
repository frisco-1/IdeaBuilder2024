const createDatabaseConnections = require('../config/database');
const userSchema = require('./userSchema');

// Get database connections
const { catalogConnection, userConnection } = createDatabaseConnections();

// Import your existing catalog models (from schemas.js)
// These will use the catalog database connection
const BusinessCard = catalogConnection.model('BusinessCard', require('./schemas').productSchema, 'business_cards');
const Flyer = catalogConnection.model('Flyers', require('./schemas').productSchema, 'flyers');
// ... you can add more catalog models here as needed

// Create User model using the user database connection
const User = userConnection.model('User', userSchema, 'users');

module.exports = {
  // Catalog models
  BusinessCard,
  Flyer,
  // ... other catalog models
  
  // User models
  User,
  
  // Database connections (in case you need them elsewhere)
  catalogConnection,
  userConnection
};
