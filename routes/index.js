 
var express = require('express'),
    router = express.Router(),
    app = express(),
    http = require('http'),
    //import delivery and fs modules for file transfer
    dl  = require('delivery'),
    fs = require('fs'),
    name = 'picto-chat',
    server = require('http').createServer(app),
    socketio = require('socket.io'),
    
    // static = require('node-static')
    path = require('path');




 //create variable for the file upload
 //use static to serve static files such as images, CSS files, and JavaScript files
// var file = new static.Server(path.join(__dirname, '..', 'public'));

//static file configuration

// router.use(express.static(_dirname + '/public'));
// router.use(express.static(_dirname + '/public/app/upload/images'));

// function handler(req, res){
// 	file.serve(req, res);
// }


//set up express to serve the files in the public folder

/* GET home page. */
router.get('/', function(req, res){
   res.render('index', { title: 'Express' });

});

io = require('socket.io').listen(server);
//set a port for the app to run on
server.listen(3000);


var newUsers = []; 
//handle socket connections..
io.sockets.on('connect',(socket)=>{
	var delivery = dl.listen(socket);
	delivery.on('receive.success',(file)=>{
		var params = file.params;
		fs.writeFile(file.name, file.buffer,(err)=>{
			if(err){
				console.log('File could not be saved');
			}else{
				console.log('File saved.')
			}
		});
	}); 

	socket.on('nameToServer',(name)=>{
		//create a class for the client 
		var clientInfo = new Object();
		clientInfo.name = name;
		clientInfo.clientId = socket.id;


		if(newUsers.indexOf(clientInfo.name) <= -1){
			newUsers.push(clientInfo.name);
			console.log("line 62 " + clientInfo.name);
			io.sockets.emit('newUser',newUsers);
		}

		socket.on('disconnect',(data)=>{
		console.log("line 69: someone disconnected")
			for (let i = 0; i < newUsers.length; i++){
				var currentUser = clientInfo;
				// console.log("line 70" + currentUser)
				//use socket.id to target specific user that logged off 
				if (currentUser.clientId == socket.id){
					// console.log("line 74" + currentUser.clientId)
					//remove the user with socket id from array 
					newUsers.pop(currentUser);
					break;
				}
			}
			var loggedoff = currentUser.name;
			console.log("line 77 " + currentUser.name + " loggedoff") 
		io.sockets.emit('userDisconnect', loggedoff, newUsers);
		});

	});
	

	socket.on('sendMessage',()=>{
		
	});

	socket.on('messageToServer',(messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient',messageObj.newMessage + ' -- ' + messageObj.name);
		console.log(messageObj.name)
	});

	




	// socket.on('is typing', (data)=>{
	// 	io.sockets.emit('typing', name)
	// });





	// // trying to serve the image file from the server
	// socket.on('connect',(socket)=>{
	// 	console.log("line 103: this working")

 //  		fs.readFile(__dirname + '/image/image.jpg', function(err, buf){
	// 	    io.sockets.emit('image', { 
	// 	    	image: true, 
	// 	    	buffer: buf.toString('base64') 
	// 	    });
	// 	    console.log('image file is initialized');
 // 		});
	// });



});

module.exports = router;


