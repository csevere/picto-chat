 
var express = require('express');
    router = express.Router();
    app = express();
    server = require('http').createServer(app);
    socketio = ('socket.io');
    fs = require('fs');
    static = require('node-static');
    path = require('path');

 //create variable for the file upload
 //use static to serve static files such as images, CSS files, and JavaScript files
var file = new static.Server(path.join(__dirname, '..', 'public'));

function handler(req, res){
	file.serve(req, res);
}

//set up express to serve the files in the public folder

/* GET home page. */
router.get('/', function(req, res) {
   res.render('index', { title: 'Express' });

});

io = require('socket.io').listen(server);


var newUsers = []; 
//handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("Someone connected via socket!");
	

	socket.on('nameToServer',(name)=>{
		 // console.log("TEST2")
		//creating a clientInfo object using default class called object
		var clientInfo = new Object();
		clientInfo.name = name;
		clientInfo.clientId = socket.id;
		if(newUsers.indexOf(clientInfo.name) <= -1){
			console.log(clientInfo.name + " just joined.");
			// console.log("TEST3")
			newUsers.push(clientInfo);
			console.log(newUsers);
			io.sockets.emit('newUser',newUsers);

		}
		
	});

	socket.on('sendMessage',()=>{
		// console.log("Someone clicked on the big blue button.");
	});

	socket.on('messageToServer',(messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient',messageObj.newMessage + ' -- ' + messageObj.name);
		console.log(messageObj.name)
	});

	socket.on('disconnect',(data)=>{
		console.log('someone logged off')
		for (let i = 0; i < newUsers.length; i++){
			var currentUser = newUsers[i];
			if (currentUser.clientId == socket.id){
				newUsers.pop(currentUser);
				break;
			}
		}
		io.sockets.emit('userDisconnect', newUsers);
	});

	socket.on('is typing', (data)=>{
		io.sockets.emit('typing', name)
	});

	socket.on('user image', function (msg) {
      console.log(msg);
      //received an image: broadcast to all
      io.sockets.emit('user image', msg);
    });


});


//set a port for the app to run on
server.listen(3000);



module.exports = router;


