const mongoose = require('mongoose');

// Model Productid
const productidSchema = new mongoose.Schema({
    product_id: { type: String, unique: true, require: true },
    product_name: { type: String, require: true },
})

module.exports = mongoose.model('productid', productidSchema)