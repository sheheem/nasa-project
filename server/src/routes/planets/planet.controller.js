const { getAllPlanets } = require('../../models/planet.model');


async function httpgetAllPlanets(req, res) {
    return res.status(200).json( await getAllPlanets());
}

module.exports = {
    httpgetAllPlanets,
}