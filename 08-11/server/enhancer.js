/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/**
 * @file app增强
 */
const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = {
  decorateApp: function (app) {
    app._routes = [];
    app.route = function (path, processor) {
      app._routes.push({
        path: path,
        handler: processor,
      });
    };

    app.handle = function (req, res) {
      res.send = function (message) {
        res.write(message);
        res.end();
      };

      const route = app.getRoute(req);
      if (!route) {
        res.send('404了');
        return;
      }
      route.handler(req, res);
    };

    app.getRoute = function (req) {
      return app._routes.find((route) => {
        if (typeof route.path === 'string') {
          return route.path === req.url.split('?')[0];
        }
        console.log('rroute.pathoute.path:', route.path);
        return !!route.path.exec(req.url);
      });
    };

    app.static = function (dir, base) {
      app.route(new RegExp(dir), (req, res) => {
        const pathObj = url.parse(req.url, true);
        const staticDir = path.resolve(base || __dirname);
        // 获取资源文件绝对路径
        const filePath = path.join(staticDir, pathObj.pathname);
        if (!fs.existsSync(filePath)) {
          res.write('404');
          res.end();
          return;
        }
        fs.readFile(filePath, 'binary', (err, content) => {
          res.write(content, 'binary');
          res.end();
        });
      });
    };
  },
};
