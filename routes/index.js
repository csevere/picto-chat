 
var express = require('express')
    ,router = express.Router()
    ,app = express()
    ,debug = require('debug')(http)
    ,name = 'picto-chat'
    ,http = require('http')
    ,server = require('http').createServer(app)
    ,socketio = require('socket.io')
    ,fs = require('fs')
    ,static = require('node-static')
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
router.get('/', function(req, res) {
   res.render('index', { title: 'Express' });

});

io = require('socket.io').listen(server);
//set a port for the app to run on
server.listen(3000);


var newUsers = []; 
//handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("Line44: Someone connected via socket!");

	// //manually setting the close timeout 
	// io.configure( function() {
 //    	io.set('close timeout', 60*60*24); // 24h time out
	// });
	

	socket.on('nameToServer',(name)=>{
		if(newUsers.indexOf(name) <= -1){
			// console.log(name + " just joined.");
			// console.log("TEST3")
			newUsers.push(name); 
			// console.log("line57 " + name.id) <<< doesn't works
			// var userlist = newUsers.shift();
			console.log("line 58 " + newUsers);
			io.sockets.emit('newUser',newUsers);
			// io.sockets.emit('newUser', userlist);
		}

		// var clientInfo = new Object();
		// clientInfo.name = name;
		// clientInfo.clientId = socket.id;
		// console.log("line 66" + clientInfo)

		// if(newUsers.indexOf(clientInfo.name) <= -1){
		// 	newUsers.push(clientInfo.name);
		// 	// var userlist = newUsers.shift();
		// 	console.log("line 71 " + clientInfo);
		// 	io.sockets.emit('newUser',newUsers);
		// 	// io.sockets.emit('newUser', userlist);
		// }
	});

	socket.on('disconnect',(data)=>{
		for (let i = 0; i < newUsers.length; i++){
			var currentUser = newUsers[i];
			//use socket.id to target specific user that logged off 
			if (currentUser.clientId == socket.id){
				newUsers.pop(currentUser);
				break;
				console.log("line 84" + currentUser + "loggedoff")
			}
		}
		io.sockets.emit('userDisconnect', currentUser);
	});

		

	socket.on('sendMessage',()=>{
		// console.log("Someone clicked on the big blue button.");
	});

	socket.on('messageToServer',(messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient',messageObj.newMessage + ' -- ' + messageObj.name);
		console.log(messageObj.name)
	});



	socket.on('is typing', (data)=>{
		io.sockets.emit('typing', name)
	});

// 	// trying to serve the image file from the server
// 	socket.on('connect', function(socket){
//   		fs.readFile(__dirname + '/image.jpg', function(err, buf){
// 		    // it's possible to embed binary data
// 		    // within arbitrarily-complex objects
// 		    io.sockets.emit('image', { 
// 		    	image: true, 
// 		    	buffer: buf.toString('base64') 
// 		    });
// 		    console.log('image file is initialized');
//  		});
// 	});

});

module.exports = router;


