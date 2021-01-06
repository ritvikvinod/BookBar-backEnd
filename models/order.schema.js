import mongoose from 'mongoose';

const  orderSchema = mongoose.Schema({
    buyer: String,
    items: Array,
}, {timestamps: true})


module.exports = mongoose.model('order', orderSchema)