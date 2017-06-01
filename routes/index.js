 
var express = require('express');
var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path'); 


var router = express.Router();
// var port = 9000; 

//Define the port to run on

app.set('port', 9000);


//Initialize application with route
app.get('/', (req, res)=>{
	app.use(express.static(path.join(__dirname)));
	res.sendFile(path.join(__dirname, '../picto-chat', 'index.ejs'));
});


//Register events on the socket connection

io.on('connection', (socket)=>{
	socket.on('chatMessage', (from, msg)=>{
		io.emit('chatMessage', from, msg);
	});
	socket.on('notifyUser', (user)=>{
		io.emit('notifyUser', user);
	});
});

//listen application request on port 9000

http.listen(9000,()=>{
	console.log("listening on *:9000")
})


/* GET home page. */
router.get('/', function(req, res, next) {
	res.send("It works!")
	res.render('index', { title: 'Express' });
});

router.listen(port);
	console.log ("Listening on port " + port)

module.exports = router;
