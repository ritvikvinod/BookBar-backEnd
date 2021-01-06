import mongoose from 'mongoose';

const  wishSchema = mongoose.Schema({
    buyer: String,
    items: Array
})


module.exports = mongoose.model('wish', wishSchema)