const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URL;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(connectionString, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

const db = mongoose.connection

module.exports = db;