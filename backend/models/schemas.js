const mongoose = require("mongoose")
const Schema = mongoose.Schema
// Product schema is the same for most products. Some specific products have additional fields that rerquire a different schema.
const orderSchema = new Schema({
  quantity: {
    type: Number, 
    required: true,
  },
  price: {
    type: Number, 
    default: null
  }
});

const productSchema = new Schema({
  name: {
    type: String, 
    required: true,
  },
  order: {
    type: [orderSchema],
    required: true,
  },
  code: {
    type: String, 
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});

const BusinessCard = mongoose.model('BusinessCard', productSchema, 'business_cards');
const Flyer = mongoose.model('Flyers', productSchema, 'flyers');
const DoorHangers = mongoose.model('DoorHangers', productSchema, 'door_hangers')
const Envelopes = mongoose.model('Envelopes', productSchema, 'envelopes')
const LetterHeads = mongoose.model('LetterHeads', productSchema, 'letterheads')
const Invoices = mongoose.model('Invoices', productSchema, 'invoices')
const PocketFolders = mongoose.model('PocketFolders', productSchema, 'pocket_folders')
const Recordatorios = mongoose.model('Recordatorios', productSchema, 'recordatorios')


//TICKET SCHEMA
const ticketSchema = new Schema({
  code: {
    type: String, 
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  price: {
    type: Number, 
    default: null
  }
})

const Tickets = mongoose.model('Tickets', ticketSchema, 'tickets');

//BOOKLET SCHEMA

const pricingSchema = new Schema({
  quantityRange: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const bookletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  pricing: {
    type: [pricingSchema],
    required: true,
  },
  image: {
    type: String,
    required: false,
  }
});

const Booklets = mongoose.model('Booklets', bookletSchema, 'booklets');

//INVITATIONS SCHEMA
// Main schema for invitations
const invitationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  order: {
    type: [orderSchema],
    required: true,
  },
  envelopeFee: {
    type: Number,
    required: false,
  },
  extraQuantityFee: {
    type: Number,
    required: false,
  }
});

const Invitation = mongoose.model('Invitations', invitationSchema, 'invitations');


const mySchemas = {

  'BusinessCards': BusinessCard, 
  'Flyers': Flyer, 
  'DoorHangers': DoorHangers,
  'Envelopes': Envelopes,
  'Letterheads' : LetterHeads,
  'Invoices' : Invoices,
  'PocketFolders' : PocketFolders,
  'Recordatorios' : Recordatorios,
  'Tickets': Tickets,
  'Booklets': Booklets,
  'Invitations': Invitation,

}
module.exports = mySchemas;