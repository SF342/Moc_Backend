const mongoose =  require('mongoose');

// Model Product
const productSchema = new mongoose.Schema({
    product_id: { type: String, unique: true},
    product_name: { type: String},
    product_desc_en: { type: String},
    product_desc_th: { type: String},
    category_name: { type: String},
    group_name: { type: String},
    unit: { type: String},
    price_min_avg: { type: Number},
    price_max_avg: { type: Number},
    price_list: { type: Array},
    description: { type: String, default: ''}


})

module.exports = mongoose.model('product', productSchema)


