const request = require('supertest');
const app = require('../../app');
const { mongoConnect } = require('../../utils/mongo.utils')

const completeLaunchData = {
    mission: "USS Enterprise",
        rocket: "Sunny",
        target: "Kepler-1649 b",
        launchDate: "January 12, 2050"
}

const launchDataWithoutDate = {
     mission: "USS Enterprise",
        rocket: "Sunny",
        target: "Kepler-1649 b",
}

const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
       rocket: "Sunny",
       target: "Kepler-1649 b",
       launchDate: "zootopia"
}


describe('Test Launch API', () => {

beforeAll(() => {
    mongoConnect();
})

    describe('Test GET /launch', () => {
        test('It should respond with 200 success', async ()=>{
            const response = await request(app).get('/v1/launch');
            expect(response.statusCode).toBe(200);
        })
    });
    
    describe('Test POST /launch', () => {
        test('It should respond with 201 created', async() => {
            const response = await request(app).post('/v1/launch').send(completeLaunchData).expect('Content-Type', /json/).expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('It should catch missing required properties', async()=> {
            const response = await request(app).post('/launch').send(launchDataWithoutDate).expect(400);
    
            expect(response.body).toStrictEqual({
                error: "Missing required field"
            })
        });
        test('It should catch missing invalid dates', async() => {
            const response = await request(app).post('/v1/launch').send(launchDataWithInvalidDate).expect(400);
    
            expect(response.body).toStrictEqual({
                error: "Invalid Launch Date"
            })
        });
    })
})

