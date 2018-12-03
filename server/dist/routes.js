"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('*', function (req, res) {
  var route = _path.default.join(__dirname, '..', '..', 'dist', 'index.html');

  res.sendFile(route);
});
module.exports = router;