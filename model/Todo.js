const mongoose =  require('mongoose');

// schema todolist
const TodoSchema = new mongoose.Schema({
    id_user: {type: mongoose.SchemaTypes.ObjectId},
    date:{type: String, required: false},
    priority:{type: String, required: false},
    taskDetail:{type: String, required: true},
    taskDate:{type: String, required: false},
    textTime:{type: String, required: false},
    timestamp:{type: String, required: false},
    topic:{type: String, required: true},
    urlPhoto:{type: String, required: false},
    achive:{type:Boolean, require: true}
})

module.exports = mongoose.model('Todo', TodoSchema)