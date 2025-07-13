const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true // Ensure email uniqueness
    },
    password:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create the User model - this will create/use the "UserData" collection
const User = mongoose.model('User', userSchema, 'UserData');

module.exports = User;