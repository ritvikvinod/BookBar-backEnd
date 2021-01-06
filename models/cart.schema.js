import mongoose from 'mongoose';

const  cartSchema = mongoose.Schema({
    buyer: String,
    items: Array
})


module.exports = mongoose.model('cart', cartSchema)