var express = require('express'),
    router = express.Router();


console.log("sockets listening on port 3000");
console.log("express listening on port 7080"); 
/* GET home page. */
router.get('/', function(req, res){
   res.render('index', {title: 'Express'});

});


module.exports = router;



