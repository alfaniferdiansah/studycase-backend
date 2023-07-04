const mongoose = require('mongoose')
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('../config/index')

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)

const db = mongoose.connection

module.exports = db