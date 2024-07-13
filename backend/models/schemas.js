const mongoose = require("mongoose")
const Schema = mongoose.Schema

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

const Tickets = mongoose.model('Tickets', ticketSchema, 'tickets')

const mySchemas = {

  'BusinessCards': BusinessCard, 
  'Flyers': Flyer, 
  'DoorHangers': DoorHangers,
  'Envelopes': Envelopes,
  'Letterheads' : LetterHeads,
  'Invoices' : Invoices,
  'PocketFolders' : PocketFolders,
  'Recordatorios' : Recordatorios,
  'Tickets' : Tickets

}
module.exports = mySchemas;