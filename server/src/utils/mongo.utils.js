const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


async function mongoConnect(mongoUrl) {
   await mongoose.connect(MONGO_URL);
}

async function connectionStatus() {
    await mongoose.connection.once('open', () => {
        console.log("MongoDb Connected");
    })
    
    await mongoose.connection.on('error', (err) => {
        console.error(err);
    })
}


module.exports = {
    mongoConnect,
    connectionStatus
}