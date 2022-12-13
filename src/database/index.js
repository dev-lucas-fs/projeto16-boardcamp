const { Pool } = require("pg")
const dotenv = require('dotenv')
dotenv.config()

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
})

/**
 * 
 *     
 *     host: "localhost",
        user: "postgres",
        password: "root",
        port: "5432",
        database: "boardcamp"
 * 
 */