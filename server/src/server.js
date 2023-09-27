const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const {mongoConnect, connectionStatus} = require('./utils/mongo.utils')

const app = require('./app');

const { loadPlanetData } = require('./models/planet.model')
const { loadLaunchData } = require('./models/launch.model');

const PORT = process.env.PORT || 3001;


const server = http.createServer(app);

connectionStatus();

async function startServer() {
    await mongoConnect();
    await loadPlanetData();
    // await loadLaunchData();
    server.listen(PORT, ()=> {
        console.log(`Server listening on port ${PORT}`);
    });
}

startServer();
// sheheem
// zain@1962