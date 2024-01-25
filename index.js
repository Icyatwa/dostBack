require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/user')
const rideRoutes = require('./routes/ride')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({
  origin: "https://dostfront.onrender.com", // Replace with your actual Render app domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use('/api/ride', rideRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })