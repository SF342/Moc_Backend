const mongoose =  require('mongoose');

// Model user 
const favoriteSchema = new mongoose.Schema({
    id_user: {type: mongoose.SchemaTypes.ObjectId},
    product_id: { type: String, unique: true},
    product_name: { type: String},
})

module.exports = mongoose.model('favorite', favoriteSchema)