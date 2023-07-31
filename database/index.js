const mongoose = require('mongoose')
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('../config/index')

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)

// mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.t8yuaoi.mongodb.net/?retryWrites=true&w=majority`)

const db = mongoose.connection

module.exports = db