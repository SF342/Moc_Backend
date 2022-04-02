const mongoose =  require('mongoose');

// schema todolist
const TodoSchema = new mongoose.Schema({
    id_user: {type: mongoose.SchemaTypes.ObjectId},
    product_id:{type: String, required: false},
    product_name:{type: String, required: false},
})

module.exports = mongoose.model('Todo', TodoSchema)