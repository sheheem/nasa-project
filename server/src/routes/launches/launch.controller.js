const { getAllLaunch } = require('../../models/launch.model');

function httpgetAllLaunch(req, res) {
    res.status(200).json(getAllLaunch())
}

module.exports = {
    httpgetAllLaunch
}