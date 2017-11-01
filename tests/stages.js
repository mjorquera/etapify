var request = require('supertest');
var app = require('./../app');

describe('Listing Stages', () => {
    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/stages')
            .expect(200,done);
    });

    it('Returns a json object', (done) => {
        request(app)
            .get('/stages')
            .expect('Content-Type',/json/,done);
    });

    it('Returns a intial list of stages', (done) => {
        request(app)
        .get('/stages')
        .expect(JSON.stringify(['Lobezno', 'Saltador', 'Diestro', 'Cazador']),done);    
    });
});
