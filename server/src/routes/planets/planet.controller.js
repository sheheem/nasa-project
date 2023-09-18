const { getAllPlanets } = require('../../models/planet.model');


function httpgetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpgetAllPlanets,
}