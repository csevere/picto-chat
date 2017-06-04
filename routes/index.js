 
var express = require('express');
var app = require('express')();
var http = require('http');
var io = require('socket.io')(http);
var path = require('path'); 


var router = express.Router();
var socketio = require("socket.io"); 
var fs = require("fs");


var server = http.createServer((req, res)=>{
	console.log ("Someone conntected via HTTP"); 
	fs.readFile('index.html', 'utf-8', (error, data)=>{
		console.log(error);
		console.log(data); 
		if(error){
			res.writeHead(500, {'content-type': 'text/html'});
			res.end('Internal Server Error');
		}else{
			res.writeHead(200, {'content-type': 'text/html'})
			//browser can only read this 
			// index. html read as variable data and sent node style
			res.end(data); 
		}
	});
});


// //Define the port to run on



///this runs on the server
// var io = socketio.listen(port);

var io = socketio.listen(server); 
var newUsers = [];

//handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("Someone connected via socket!");
	// console.log(socket);

	socket.on('nameToServer',(name)=>{
		var clientInfo = new Object();
		clientInfo.name = name;
		clientInfo.clientId = socket.id;
		newUsers.push(clientInfo);
		console.log(clientInfo.name + " just joined.");
		io.emit('newUser',name);
	});

	socket.on('sendMessage',()=>{
		console.log("Someone clicked on the big blue button.");
	});

	socket.on('messageToServer',(messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient',messageObj.newMessage + ' -- ' + messageObj.name);
		console.log(messageObj.name)
	});

	// socket.on('disconnect',(data)=>{
	// 	console.log('someone logged off')
	// 	for (let i = 0; i < users.length; i++){
	// 		var currentUser = users[i];
	// 		if (currentUser.clientId == socket.id){
	// 			users.pop(currentUser);
	// 			break;
	// 		}
	// 	}
	// 	// io.sockets.emit('userDisconnect',users);
	// });

});

// console.log("The node file is working.");
// server.listen(7090);

// Listen application request on port 3000
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// router.listen(port);
// 	console.log ("Listening on port " + port)

module.exports = router;
