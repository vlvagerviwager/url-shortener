const Koa = require('koa');
const route = require('koa-route');

const app = new Koa();

// -- ROUTES

app.use(route.get('/', index));

function index() {
	this.body = '<h1>URL Shortener</h1><br><label>Enter a URL to shorten: <input id="url" type="text"></label><br><button name="submit">Shorten!</button>';
}

var port = 3000;
app.listen(port);
console.log('Koa is listening on port ' + port);
