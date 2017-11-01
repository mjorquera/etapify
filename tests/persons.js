var request = require('supertest');
var app = require('./../app');

var redis = require('redis');
var client = redis.createClient();

client.select('test'.length);
client.flushdb();

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
            .expect(JSON.stringify([]),done);        
    });
});

describe('Create new person', () => {
    it('Returns a 201 status code', (done) => {
        request(app)
            .post('/persons')
            .send('name=Santino&stage=Lobezno')
            .expect(201,done);
    });

    it('Returns the person name', (done) => {
        request(app)
            .post('/persons')
            .send('name=Santino&stage=Lobezno')
            .expect(/santino/i,done);
    });

    it('Validates the name and stage', (done) => {
        request(app)
            .post('/persons')
            .send('name=&stage=')
            .expect(400,done);
    });
});

describe('Get info of a person', () => {

    before(() => {
        client.hset('persons','Banana','Lobezno');
    });

    after(() => {
        client.flushdb();
    });

    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/persons/Banana')
            .expect(200,done);
    });
    
    it('Returns a html content', (done) => {
        request(app)
            .get('/persons/Banana')
            .expect('Content-Type',/html/,done);
    });

    it('Returns information for thhe given person', (done) => {
        request(app)
            .get('/persons/Banana')
            .expect(/Lobezno/,done);
    });
});

describe('Deleting persons', () => {
    before(() => {
        client.hset('persons','Banana','A tasty fruit');
    });

    after(() => {
        client.flushdb();
    });

    it('Returns a 204 status code', (done) => {
        request(app)
            .delete('/persons/Banana')
            .expect(204,done);
    });
});
