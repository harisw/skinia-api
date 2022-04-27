const mongoose = require('mongoose');

const skincareSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        ingreds: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Skincare = mongoose.model('Skincare', skincareSchema);
module.exports = Skincare;