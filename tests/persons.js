var request = require('supertest');
var app = require('./../app');

describe('Request to the root path', () => {
    
    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returns a HTML file', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type',/html/,done);
    });

});

describe('Listing persons', () => {
    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/persons')
            .expect(200,done);
    });

    it('Returns a json object', (done) => {
        request(app)
            .get('/persons')
            .expect('Content-Type',/json/,done);
    });

    it('Returns an initial list of persons', (done) => {
        request(app)
            .get('/persons')
            .expect(JSON.stringify(["Santino","Javi","Lucas"]),done);        
    });
});

describe('Create new person', () => {
    it('Returns a 201 status code', (done) => {
        request(app)
            .post('/persons')
            .send('name=Santino&stage=Lobezno')
            .expect(201,done);
    });

    it('Returns the city name', (done) => {
        request(app)
            .post('/persons')
            .send('name=Santino&stage=Lobezno')
            .expect(/santino/i,done);
    });

    it('Validates the name', (done) => {
        request(app)
            .post('/persons')
            .send('name=')
            .expect(400,done);
    });
});
