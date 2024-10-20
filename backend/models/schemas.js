const mongoose = require("mongoose")
const Schema = mongoose.Schema

//PRODUCT SCHEMA
// Product schema is the same for most products. Some specific products have additional fields that rerquire a different schema.
const orderSchema = new Schema({
  quantity: {
    type: [Number, String], 
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
const VinylStickers = mongoose.model('VinylStickers', productSchema, 'vinyl_stickers')
const Booklets = mongoose.model('Booklets', productSchema, 'booklets');


//LITE PRODUCT SCHEMA
// This is a schema made for products that don't follow the regualar product schema.
const liteProductSchema = new Schema({
  code: {
    type: String, 
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  name:{
    type: String,
    required: false
  },
  price: {
    type: Number, 
    default: null
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String, 
    required: false
  }
})

const Tickets = mongoose.model('Tickets', liteProductSchema, 'tickets');
const PrintedVinylLaminated = mongoose.model('PrintedVinylLaminated', liteProductSchema, 'printed_vinyl_laminated');
const RealtorSigns = mongoose.model('RealtorSigns', liteProductSchema, 'realtor_signs');
const CoroplastSigns = mongoose.model('CoroplastSigns', liteProductSchema, 'coroplast_signs');
const AFrame = mongoose.model('AFrame', liteProductSchema, 'a_frame');
const ArrowSigns =  mongoose.model('ArrowSigns', liteProductSchema, 'arrow_signs');
const SingleArmSignPost = mongoose.model('SingleArmSignPost', liteProductSchema, 'single_arm_sign_post');
const RollUpBanners = mongoose.model('RollUpBanners', liteProductSchema, 'roll_up_banners');
const CustomFlags = mongoose.model('CustomFlags', liteProductSchema, 'custom_flags');
const TableCovers = mongoose.model('TableCovers', liteProductSchema, 'table_covers');
const MagneticSigns = mongoose.model('MagneticSigns', liteProductSchema, 'magnetic_signs');
const MaxMetalLaminated = mongoose.model('MaxMetalLaminated', liteProductSchema, 'max_metal_laminated');


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
  },
  image: {
    type: String, 
    required: false,
  }
});

const Invitation = mongoose.model('Invitations', invitationSchema, 'invitations');


//SEARCH SCHEMA MODEL
// This schema is used to store the search results.
const keywordsSchema = new Schema({
  keyword: {type: String, required: true},
  productLink: {type: String, required: true},
  productName: {type: String, required: true}
})
const Keywords = mongoose.model('Keywords', keywordsSchema, 'keywords');

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
  'VinylStickers': VinylStickers,
  'PrintedVinylLaminated': PrintedVinylLaminated,
  'RealtorSigns': RealtorSigns,
  'CoroplastSigns': CoroplastSigns,
  'AFrame': AFrame,
  'ArrowSigns': ArrowSigns,
  'SingleArmSignPost': SingleArmSignPost,
  'RollUpBanners': RollUpBanners,
  'CustomFlags': CustomFlags,
  'TableCovers': TableCovers,
  'Keywords': Keywords,
  'MagneticSigns': MagneticSigns,
  'MaxMetalLaminated': MaxMetalLaminated

}
module.exports = mySchemas;