const express = require('express');
var cors = require('cors');
const app = express();
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 6000;

//Import Routes
const userRoute = require('./route/user');
const bienRoute = require('./route/bien');
const pointageRoute = require('./route/pointage');
const rendezvous_Route = require('./route/rendezvous');
const visiteRoute = require('./route/visite');
//Connect to DB

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('data base is connected');
  } catch (error) {
    console.log('can note connect date base',error);
  }
};

connectDb();
//configuration de cors
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001','https://leaderimmo.alwaysdata.net'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//Middleware for read the format json
app.use(express.json());

//Route Middelware
app.use('/api/user', userRoute);
app.use('/api/bien', bienRoute);
app.use('/api/pointage', pointageRoute);
app.use('/api/rdv', rendezvous_Route);
app.use('/api/visite', visiteRoute);

app.listen(port, () => console.log(` Server Up and running on:${port} `));
