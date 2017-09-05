# url-shortener

A URL shortener using Koa, Redis, ES6. 

https://github.com/zky829/url-shortener/projects/1

## How to run on macOS

1. Start up Redis
	1. Install [Redis](https://redis.io/download) and add to path
	1. Open terminal, `cd /usr/local/etc`
	1. `touch redis.conf`
	1. `redis-server /usr/local/etc/redis.conf --port 8000`
1. Start up app 
	1. Open new terminal tab
	1. `yarn install`
	1. `cd src`
	1. `yarn install`
	1. `nodemon server.js`
1. Open http://localhost:3000/ in browser

### ESLint

`./node_modules/.bin/eslint src/server.js`


