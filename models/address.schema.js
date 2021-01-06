const mongoose = require('mongoose');

export const address = mongoose.Schema({
   street: {
    type: String,
    required:true,
  },
   pincode:{
    type: Number,
    required:true,
  },
   city: {
    type: String,
    required:true,
  },
   state: {
    type: String,
    required:true,
  },
   country:{
    type: String,
    required:true,
  }
});