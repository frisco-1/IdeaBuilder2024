const express = require('express')
const cors = require('cors') //access our server to different domains. We would run issues without it.
const bodyParser = require('body-parser') //Mainly used for form posting, I believe.
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json()) //submitting the form data as json data.
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
  origin: '*',
  credentials: true, 
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router) //this line is necessary to have at the end.

mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB Connected!'))
.catch(err => console.log(err))

const port = process.env.PORT
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})