const mongoose =  require('mongoose');

// Model user 
const userSchema = new mongoose.Schema({
    username: { type: String, default: null},
    email: { type: String, unique: true},
    password: { type: String},
    token: { type: String},
})

module.exports = mongoose.model('user', userSchema)