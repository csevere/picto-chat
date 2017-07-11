 
var express = require('express'),
    router = express.Router(),
    app = express(),
    server = require('http').createServer(app),
    http = require('http'),
    name = 'picto-chat',
    socketio = require('socket.io'),
    //io is listening to the server
    io = require('socket.io').listen(server);
	//set a port for the app to run on
	server.listen(3000);
	console.log("listening on port 3000")

	//import delivery and fs modules for file transfer, but not necessary for express however
    dl  = require('delivery'),
    fs = require('fs'),



/* GET home page. */
router.get('/', function(req, res){
   res.render('index', { title: 'Express' });

});

//empty array to put in new users 
var newUsers = []; 
//handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("new user connected to socket!")
	
	socket.on('nameToServer',(name)=>{

		//create a class for the client 
		var clientInfo = new Object();
		clientInfo.name = name;
		clientInfo.clientId = socket.id;

		//makes sure it doesn't select or push the same name in an array 
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


});




module.exports = router;


//ATTEMPTS TO SEND IMAGE VIA SOCKETS

///handling receiving files 

// io.sockets.on('connect', function(socket){
// 	console.log("waiting for delivery")
//   var delivery = dl.listen(socket);
//   delivery.on('receive.success',function(file){
//     var params = file.params;
//     fs.writeFile(file.name,file.buffer, function(err){
//       if(err){
//         console.log('File could not be saved.');
//       }else{
//         console.log('File saved.');
//       };
//     });
//   });
// });
