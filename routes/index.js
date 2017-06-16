 
var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var socketio = ("socket.io");


//set up express to serve the files in the public folder

/* GET home page. */
router.get('/', function(req, res) {
   res.render('index', { title: 'Express' });

});

io = require('socket.io').listen(server);


var users = []; 
//handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("Someone connected via socket!");
	// console.log(socket);

	socket.on('nameToServer',(name)=>{
		 console.log("TEST2")
		//creating a clientInfo object using default class called object
		var clientInfo = new Object();
		clientInfo.name = name;
		clientInfo.clientId = socket.id;
		users.push(clientInfo);
		console.log(clientInfo.name + " just joined.");
		console.log("TEST3")
		io.sockets.emit('newUser',users);
	});

	socket.on('sendMessage',()=>{
		console.log("Someone clicked on the big blue button.");
	});

	socket.on('messageToServer',(messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient',messageObj.newMessage + ' -- ' + messageObj.name);
		console.log(messageObj.name)
	});

	socket.on('disconnect',(data)=>{
		console.log('someone logged off')
		for (let i = 0; i < users.length; i++){
			var currentUser = users[i];
			if (currentUser.clientId == socket.id){
				users.pop(currentUser);
				break;
			}
		}
		// io.sockets.emit('userDisconnect',users);
	});


});

console.log("The node file is working.");
//make sure that the server listens 
server.listen(3000);



module.exports = router;


