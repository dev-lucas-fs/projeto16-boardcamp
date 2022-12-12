const { Pool } = require("pg")

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    port: "5432",
    database: "boardcamp"
})