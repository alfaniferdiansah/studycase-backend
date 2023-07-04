require('dotenv').config()
module.exports = {
    secretKey: process.env.SECRET_KEY,
    dbHost: process.env.DB_HOST,
    hostApp: process.env.HOST_APP,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    portApp: process.env.APP_PORT,
    dbPort: process.env.DB_PORT,
    product: process.env.PRODUCT,
    stripePublished: process.env.STRIPE_PUBLISHABLE_KEY,
    secretStripe: process.env.STRIPE_SECRET_KEY
}