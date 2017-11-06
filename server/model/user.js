var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');

Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    // firstName: { type: String },
    // lastName: { type: String },
});

userSchema.pre('save', function(next){
    if (this.isModified('password')){
        return next();
    }

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);