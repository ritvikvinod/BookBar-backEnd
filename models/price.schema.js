const mongoose = require('mongoose')

export const price = mongoose.Schema({
    amount: Number,
    currency: String
});

