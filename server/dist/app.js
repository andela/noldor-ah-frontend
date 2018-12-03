"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
var routes = require('./routes');

var app = (0, _express.default)();
var port = process.env.PORT || 7000;
app.use('/', _express.default.static(_path.default.join(__dirname, '..', '..', 'dist')));
app.use('/', routes);
app.use('/dist', _express.default.static(_path.default.join(__dirname, '..', '..', 'dist')));
var server = app.listen(port, function () {
  return console.log("Running on port ".concat(server.address().port));
});
var _default = app;
exports.default = _default;