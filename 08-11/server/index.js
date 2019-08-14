/**
 * @file 入口文件
 *
 */
const http = require('http');
const path = require('path');
const enhancer = require('./enhancer');
const mockData = require('./mock');

const app = http.createServer((req, res) => {
  app.handle(req, res);
});

enhancer.decorateApp(app);

app.route('/', (req, res) => {
  res.send('aaa');
});

app.route('/list', (req, res) => {
  res.send(JSON.stringify(mockData));
});

app.static('\\/static', path.resolve(__dirname, '../toutiao-es6/'));

app.listen(8099, '0.0.0.0');
