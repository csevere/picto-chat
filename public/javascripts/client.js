$(document).ready(function(){

    //Creating the client side script
    var socketio = io.connect('http://localhost:3000');

    // // Send an event to the server
    // socketio.emit('nameToServer',name);
    
        //////// THE JOIN EVENT ///// 
    $('#submitUser').submit(function(event){
        //prevent from repeating submission
        event.preventDefault();
        var name = $('#new-user').val();
        var data = name;  
        //coming from index.js
        //creates a tcp connection
        //sends an event to the server
        socketio.emit('nameToServer', name);     
   });


    socketio.on('newUser', (newUsers)=>{

        event.preventDefault();
      
        for(i = 0; i < newUsers.length; i++){
            console.log(newUsers);
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

    socketio.on('userDisconnect', (loggedoff, newUsers)=>{  
        $('#users').empty(); 
        //update the list of users online 
        var online = newUsers.join('<br/>')
        $('#messages').prepend(`<p>${loggedoff} has left the chat!</p>`); 
        $('#users').append(`<div id="users">${online}</div>`);
        console.log(newUsers)

            console.log(newUsers);

        });
          

});


   


    //UPLOAD PICTURE FUNCTION///


//     $('#imagefile').bind('change', function(e){
//       var data = e.originalEvent.target.files[0];
//       var reader = new FileReader();
//       reader.onload = function(evt){
//         image('me', evt.target.result);
//         socket.emit('user image', evt.target.result);
//       };
//       reader.readAsDataURL(data);
      
//     });


//         //image is received/add img element to DOM
        
//         socketio.on('user image', image);

//         function image (from, base64Image) {
//             $('#messages').append($('<b>').text(from),
//             '<img src="' + base64Image + '"/>');
//         }
// });



    // var ctx = document.getElementById('canvas').getContext('2d');


    // socketio.on('image',(info)=>{
    //     if(info.image){
    //         //create an image constructor for canvas
    //         var img = new Image();
    //         img.src = 'data:image/jpeg;base64,' + image.buffer;
    //         ctx.drawImage(img, 0, 0);
    //     }
    //     $('#messages').append('<img src="' + img + '"/>');
        

    // })


    // socketio.on('connect', ()=>{
    //     var delivery = new Object(socketio); 
    //     console.log("waiting to send")

    //     delivery.on('delivery.connect', (delivery)=>{
    //         $("input[type=submit]").submit((event)=>{
    //             var file = $("input[type=file]")[0].files[0];
    //             var extraParams = {image: 'image'}
    //             evt.preventDefault
    //             console.log("it works")
    //         })
    //     });

    //     delivery.emit('send.success', (fileUID)=>{
    //         console.log("file was successfilly sent.")
    //     })
    // });




    ///UPLOADING THE IMAGE 

    // socketio.on('user image', image)
    
    // function image (from, base64Image){
    //     $('#image')..append($('<p>').append($('<b>').text(from), '<img src="' + base64Image + '"/>'));
    // }

    // $('#imagefile').bind('change', function(e){
    //     var data = e.originalEvent.target.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function(evt){
    //         image('me', evt.target.result);
    //         socket.emit('user image', evt.target.result);
    //       };
    //       reader.readAsDataURL(data);
      
    // });

    
                   