import mongoose from 'mongoose';
import {price} from "./price.schema";
import {isbn} from "./isbn.schema";


export const BookSchema = new mongoose.Schema({
        isbn:isbn,
        quantity:{
            type:Number,
            required: true
        },
        price: price,
        seller: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true
    }, {
    collection: 'book'
    }
)

module.exports = mongoose.model('book', BookSchema)
// export default Book

