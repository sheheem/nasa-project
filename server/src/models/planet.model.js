const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planets.schema');

const isHabitable = (planets) => {
    return planets['koi_disposition'] === 'CONFIRMED' && planets['koi_insol'] > 0.36 && planets['koi_insol'] < 1.11 && planets['koi_prad'] < 1.6;
}

function loadPlanetData() {
    return new Promise((resolve, reject) =>{
        fs.createReadStream(path.join(__dirname,'..','..','data','keplar_data.csv')).pipe(parse({
            comment: '#',
            columns: true
        })).on('data', async(data) => {
            if(isHabitable(data)) {
                savePlanet(data);
            }
        }).on('error', (err) => {
            reject(err);
        }).on('end', async() => {
            const countPlanetsFound = (await getAllPlanets()).length
            console.log(countPlanetsFound,'habitable planets found');
        });
        resolve();  
    }) 
}

async function getAllPlanets(){
    return await planets.find({})
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planets.kepler_name
        }, {
            upsert: true
        })
    } catch(err) {
        console.error("Couldn't save the data...");
    }
}


module.exports = {
    loadPlanetData,
    getAllPlanets
};