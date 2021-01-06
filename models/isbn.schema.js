const mongoose = require('mongoose')

export const isbn = mongoose.Schema({
    type: String,
    identifier: String
});

