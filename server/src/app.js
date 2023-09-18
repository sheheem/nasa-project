const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetRouter = require('./routes/planets/planet.router');
const launchRouter = require('./routes/launches/launch.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))

app.use(planetRouter);
app.use(launchRouter);


module.exports = app;