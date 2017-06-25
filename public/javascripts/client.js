$(document).ready(function(){

    //Creating the client side script
    var socketio = io.connect('http://localhost:3000');

    // // Send an event to the server
    // socketio.emit('nameToServer',name);
    
        //////// THE JOIN BUTTON ///// 
    $('#submitUser').submit(function(event){
        //prevent from repeating submission
        event.preventDefault();
        var name = $('#new-user').val();
        var data = name; 
         // $('#users').empty();
        // console.log(name);  
        //coming from index.js
        //creates a tcp connection
        //sends an event to the server
        // console.log("TEST1");
        socketio.emit('nameToServer', name);     
   });


    socketio.on('newUser', (newUsers)=>{
        event.preventDefault();
      
        for(i = 0; i < newUsers.length; i++){
            //prevents someone from joining chat with a name already in the array
            if(newUsers.indexOf(i) <= -1){
                // console.log(newUsers);
                //create new variable that will be assigned the last index in the array to display in users div
                var user = (newUsers.slice(-1)[0])
            }
            // console.log(newUsers.slice(-1)[0]) 
        }

        $('#users').append(`<div id="users">${user}</div>`);
        $('#messages').prepend(`<p>${user} has joined the chat!</p>`); 



        // console.log("TEST4")
        // console.log(userName + " just joined!")

        // usernames.forEach((elem) => {
        //    // console.log(userName);
        //    console.log(elem); 
        //    $('#users').append(`<div id="users">${elem}</div>`);
        //    $('#messages').prepend(`<p>${elem} has joined the chat!</p>`);   
        // })

        // console.log("TEST5")
        // $('#users').empty();
    });
          
      

    $('#submit-message').submit(function(event){
        event.preventDefault();
        var name = $('#new-user').val();
        var newMessage = $('#new-message').val();
        var el = document.getElementById("messages");
        el.scrollTop = el.scrollHeight;
        // console.log(newMessage)
        socketio.emit('messageToServer', {
                newMessage: newMessage,
                name: name 
        });

    });
        
    socketio.on('messageToClient', (message)=>{
        var now = new Date(Date.now());
        var uiFormat = now.getHours() + ":" + now.getMinutes(); 
        // console.log(uiFormat); 

        $('#messages').prepend('<p> ' + message +  ' (' +uiFormat+ ')' + '</p>'); 

        });

      ////////////// DISCONNECT///////////////////////////

    socketio.on('userDisconnect', (currentUser)=>{  
        $('#messages').prepend(`<p>${currentUser} has left the chat!</p>`); 

            console.log(currentUser);
         // console.log(elem);

        //  newUsers.forEach((elem) => {   
        //    $('#messages').prepend(`<p>${elem} has left the chat!</p>`); 

        // });
        //  console.log(newUsers);
        //  // console.log(elem);

        });
       


    var context = canvas.getContext('2d');


    socketio.on('image',(info)=>{
        if(info.image){
            var img = new Image();
            img.src = "data:image/jpeg;base64," + image.buffer;
            ctx.drawImage(img, 0, 0);
        }


    })


    //image is received/add img element to DOM
    
    socketio.on('image', image);

    function image (from, base64Image) {
        $('#messages').append($('<b>').text(from),
        '<img src="' + base64Image + '"/>');
    }



    //UPLOAD PICTURE FUNCTION///


    $('#imagefile').bind('change', function(e){
      var data = e.originalEvent.target.files[0];
      var reader = new FileReader();
      reader.onload = function(evt){
        image('me', evt.target.result);
        socket.emit('user image', evt.target.result);
      };
      reader.readAsDataURL(data);
      
    });


        //image is received/add img element to DOM
        
        socketio.on('user image', image);

        function image (from, base64Image) {
            $('#messages').append($('<b>').text(from),
            '<img src="' + base64Image + '"/>');
        }
});


                    ///// END OF CHAT /////
                   