/* eslint no-console: 0 */

const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const urlRegexp = require('url-regexp');

const app = new Koa();
app.use(koaBody());


/**
 * Validate a URL.
 *
 * @param {string} url The URL to validate.
 * @return {Boolean} true is the URL is valid.
 */
function isValidUrl(value) {
  return urlRegexp.validate(value);
}

/**
 * Generate a slug with a chosen number of characters.
 *
 * @param {number} length The desired length of the generated slug. Default value is 5.
 */
function generateSlug(length) {
  const slugLength = length || 5;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';

  for (let i = 0; i < slugLength; i += 1) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slug;
}


async function index(ctx) {
  ctx.body = '<h1>URL Shortener</h1><br><label>Enter a URL to shorten: <input id="url" type="text"></label><br><button name="submit">Shorten!</button>';

  return undefined;
}

async function shortenURL(ctx) {
  const body = ctx.request.body;
  const linkToShorten = body.url.trim();

  if (!isValidUrl(linkToShorten)) {
    console.log(`Oops! ${linkToShorten} is not a valid URL :(`);
    return false;
  }

  console.log(`User input: ${linkToShorten}`);

  // TODO: Check if the link has been shortened before

  const slug = generateSlug();
  const shortLink = `https://turtl.es/${slug}`;

  console.log(`Shortened link: ${shortLink}`);
  ctx.response.body = { url: shortLink };
  return undefined;
}


// -- ROUTES

router.get('/', index)
  .post('/', shortenURL);

app.use(router.routes());


const port = 3000;
app.listen(port);
console.log(`Koa is listening on port ${port}`);
