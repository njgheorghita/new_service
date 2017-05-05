var express = require('express');
var router = express.Router();

//TODO: Take this out. Just a hello world for hitting the server
router.get('/hello', function(req, res, next) {
  res.send({helloTarget: 'World'});
});

module.exports = router;
