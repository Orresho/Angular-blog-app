var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);