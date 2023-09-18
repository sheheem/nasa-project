const http = require('http');
const app = require('./app');

const { loadPlanetData } = require('./models/planet.model')

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
    await loadPlanetData();
    server.listen(PORT, ()=> {
        console.log(`Server listening on port ${PORT}`);
    });
}

startServer();
