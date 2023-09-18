const express = require('express');
const { httpgetAllPlanets } = require('./planet.controller');

const planetRouter = express.Router();

planetRouter.get('/planets', httpgetAllPlanets);

module.exports = planetRouter;
