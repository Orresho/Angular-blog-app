var mongoose = require('mongoose');

function mongoDB(dbName) {
    const connectionString = `mongodb://localhost/${dbName}`;
    const db = mongoose.connect(connectionString);
    mongoose.Promise = global.Promise;

    db.connection.on('connected', () => {
        console.log('MongoDB connection opened');
    });

    db.connection.on('error', (err) => {
        console.log('An error occured connecting to mongoDB: ', err);
    });

    db.connection.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection.
    process.on('SIGING', () => {
        db.connection.close(() => {
            console.log('MongoDB connection disconnected through app termination.');
            process.exit(0);
        });
    });
}

module.exports = mongoDB;
