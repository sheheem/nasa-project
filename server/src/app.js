const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const api = require('./routes/api/api_v1')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))


app.use('/v1', api);


module.exports = app;