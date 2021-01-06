import mongoose from 'mongoose';

export const image = mongoose.Schema({
    smallThumbnail: String,
    thumbnail: String
})

