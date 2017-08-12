const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');

const app = new Koa();
app.use(koaBody());

// -- ROUTES

router.get('/', index)
.post('/', shortenURL);

app.use(router.routes());

async function index(ctx) {
	ctx.body = '<h1>URL Shortener</h1><br><label>Enter a URL to shorten: <input id="url" type="text"></label><br><button name="submit">Shorten!</button>';
}

async function shortenURL(ctx) {
	const body = ctx.request.body;
	const urlToShorten = body.url;
	console.log(urlToShorten);
	// TODO: validate, check if it's been shortened already, shorten the URL, send back the shortened URL
}

var port = 3000;
app.listen(port);
console.log('Koa is listening on port ' + port);
