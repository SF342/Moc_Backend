const mongoose = require('mongoose');

// Model user 
const favoriteSchema = new mongoose.Schema({
    user_id: { type: String, require: true },
    product_id: { type: String, require: true },
})

module.exports = mongoose.model('favorite', favoriteSchema)