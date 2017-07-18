var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  //use it to respond to routed information via a websocket
  res.io.emit("socketToMe", "users");
});

module.exports = router;
