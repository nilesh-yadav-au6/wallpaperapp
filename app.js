const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
require('./db')
const app = express()


app.use(express.json())
app.use(cors())

app.use(require("./routes/route"))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

module.exports = app