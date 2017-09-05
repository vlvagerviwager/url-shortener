const request = require('request');

const base_url = "http://localhost:3000/"

describe('URL shortener server', () => {
  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request.get(base_url, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns index page with a title, label, input field, and button', (done) => {
      request.get(base_url, (error, response, body) => {
        expect(body.includes('<h1>URL Shortener</h1><br>')).toBeTrue;
        expect(body.includes('<label>Enter a URL to shorten: <input id="url" type="text"></label><br>')).toBeTrue;
        expect(body.includes('<button name="submit" onclick="shortenUrl();">Shorten!</button>')).toBeTrue;
        done();
      });
    });
  });

  describe('POST /', () => {
    it('returns status code 500', (done) => {
      request.post(base_url, { json: true, body: { } }, (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    it('returns status code 404', (done) => {
      request.post(base_url, { json: true, body: { url: '' } }, (error, response, body) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    xit('returns status code 404', (done) => {
      request.post(base_url, { json: true, body: { url: 'hello' } }, (error, response, body) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    it('returns status code 200', (done) => {
      request.post(base_url, { json: true, body: { url:'https://github.com/zky829/url-shortener' } }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns shortened URL", (done) => {
      request.post(base_url, { json: true, body: { url:'https://github.com/zky829/url-shortener' } }, (error, response, body) => {
        expect(response.body.url.includes('https://turtl.es/')).toBeTrue;
        done();
      });
    });
  });
});
