var mongoose = require('mongoose');
var config = require('./database');

function mongoDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.uri, (err) => {
        if(err){
            console.log('Could not connect to database', err);
        } else {
            console.log('Connected to database', config.db);
        }
    });
}

module.exports = mongoDB;
