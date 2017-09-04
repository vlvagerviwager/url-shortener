/* eslint no-console: 0 */

/*
 * Run using `nodemon server.js`.
 */

const createReadStream = require('fs').createReadStream;
const serve = require('koa-static');
const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const urlRegexp = require('url-regexp');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redis = require('redis');

const client = redis.createClient({ port: 8000 });

client.on('connect', () => {
  console.log('Connected to Redis established');
});

client.on('error', (dbErr) => {
  console.log(`Something went wrong with Redis: ${dbErr}`);
});

const app = new Koa();
app.use(koaBody());

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore({ port: 8000 }),
}));

/**
 * Validate a URL.
 *
 * @param {string} url The URL to validate.
 * @return {Boolean} true is the URL is valid.
 */
function isValidUrl(value) {
  return !value.trim() ? false : true || urlRegexp.validate(value);
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
  ctx.type = 'html';
  ctx.body = createReadStream('index.html');

  return undefined;
}

async function shortenURL(ctx) {
  let body = {};
  try {
    body = ctx.request.body;
  } catch (error) {
    console.log(`Invalid request: ${error}`);
    return false;
  }

  const linkToShorten = body.url.trim();

  if (!isValidUrl(linkToShorten)) {
    console.log(`Oops! ${linkToShorten} is not a valid URL :(`);
    return false;
  }

  console.log(`User input: ${linkToShorten}`);

  let responseBody = {};

  // Check if the link has been shortened before
  let dbReplyPromise = new Promise((resolve, reject) => {
    client.exists(linkToShorten, (existsErr, existsReply) => {
      if (existsReply === 1) {
        client.get(linkToShorten, (getErr, getReply) => {
          console.log(`Shortened URL exists for input: ${getReply}`);

          responseBody = { url: getReply };
          resolve(responseBody);
        });
      } else {
        const slug = generateSlug();
        const shortLink = `https://turtl.es/${slug}`;

        console.log(`Shortened link: ${shortLink}`);

        client.set(linkToShorten, shortLink, redis.print);
        responseBody = { url: shortLink };
        resolve(responseBody);
      }
    });
  });

  return dbReplyPromise.then((response) => {
    ctx.response.body = response;
  }, (err) => {
    console.log(`Error getting replies from Redis: ${err}`);
  });
}


// -- ROUTES

router.get('/', index)
  .post('/', shortenURL);

app.use(router.routes());
// http://localhost:3000/scripts.js, not http://localhost:3000/js/scripts.js...
app.use(serve('js'));

const port = 3000;
app.listen(port);
console.log(`Koa is listening on port ${port}`);
