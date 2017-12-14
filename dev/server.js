const Koa = require('koa');
const path = require('path');
const http = require('http');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpack = require('webpack');

const app = new Koa();

console.log(Date.now(), `Child ${process.pid} is running`);
const httpServer = http.createServer(app.callback()).listen(8080);
console.log(Date.now(), 'http listening on port 8080!');

const compiler = webpack(require('../webpack.config'));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/', // Same as `output.publicPath` in most cases.
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  })
);

app.use(require('koa-static')(path.join(__dirname, '../public')));
