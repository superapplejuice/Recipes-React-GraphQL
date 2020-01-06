const express = require('express')
const mongoose = require('mongoose')

const { mongoUri } = require('./keys')

const app = express()

const PORT = process.env.PORT || 5000
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(app.listen(PORT))
  .catch(error => console.log(error))
