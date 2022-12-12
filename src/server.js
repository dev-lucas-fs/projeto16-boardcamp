const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")

const categoriesRoute = require('./routes/categories.routes')
const gamesRoute = require("./routes/games.routes")
const customersRoute = require('./routes/customers.routes')
const rentalsRoute = require('./routes/rentals.routes')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

app.use(categoriesRoute)
app.use(gamesRoute)
app.use(customersRoute)
app.use(rentalsRoute)

app.listen(process.env.PORT || 4000)