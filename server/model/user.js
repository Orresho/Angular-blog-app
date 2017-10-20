var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);