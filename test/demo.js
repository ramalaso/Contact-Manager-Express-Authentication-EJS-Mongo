var chai = require('chai');
var assert = chai.assert;
var ejs = require('ejs');
var request = require('supertest');
var app = require('../app');

describe('First test suite', function () {
    x = 0;
    beforeEach(function () {
        x = x + 1;
    });
    it('Should pass', function () {
        assert.equal(1, x);
    });
    it('Should also pass', function () {
        assert.equal(2, x);
    });

    it('EJS test', function () {
        var template = '#container';
        var expected = '<div id="container"></div>';
        var result = ejs.render(template);
        assert.equal(expected, result);
    });
    it('Supertest', (done) => {
        request(app).get('/contacts')
            .expected(200, done);
    });
});