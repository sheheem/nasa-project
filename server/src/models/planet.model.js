const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitable = [];

const isHabitable = (planets) => {
    return planets['koi_disposition'] === 'CONFIRMED' && planets['koi_insol'] > 0.36 && planets['koi_insol'] < 1.11 && planets['koi_prad'] < 1.6;
}

function loadPlanetData() {
    return new Promise((resolve, reject) =>{
        fs.createReadStream(path.join(__dirname,'..','..','data','keplar_data.csv')).pipe(parse({
            comment: '#',
            columns: true
        })).on('data', (data) => {
            if(isHabitable(data)) {
                habitable.push(data);
            }
        }).on('error', (err) => {
            reject(err);
        }).on('end', () => {
            console.log(habitable.length,'habitable planets found');
        });
        resolve();  
    }) 
}

function getAllPlanets(){
    return habitable
}


module.exports = {
    loadPlanetData,
    getAllPlanets
};