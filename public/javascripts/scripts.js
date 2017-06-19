

window.onload = function(){

    var canvas = document.getElementById('canvas');
    // console.dir(canvas);
    // console.log(document);
    var context = canvas.getContext('2d');

    //Set up the base options for the pictionary board

    var color = "black";
    var thickness = 10;
    var colorPicker = document.getElementById('color-picker');
    var thicknessPicker = document.getElementById('thickness');
    var mouseDown = false;
    //create empty objects for mouseDown and lastMousePosition
    var mousePosition = {};
    var lastMousePosition = null;
    // console.dir(colorPicker);

    //
    colorPicker.addEventListener('change', function(event){
        console.dir(event.target);
        color = colorPicker.value; //import cause always getting values from forms
        // color = event.target.value; does the same thing as above
        // console.log(color);

    });

    thicknessPicker.addEventListener('change', function(event){
        console.log(event);
        thickness = thicknessPicker.value;
        // thickness = event.target.value; does the same thing
        // console.log(thickness);

    });

    canvas.addEventListener('mousedown', function(event){
        mouseDown = true;
        lastMousePosition = null;
    });

    canvas.addEventListener('mouseup', function(event){
        mouseDown = false;

    });

    canvas.addEventListener('mousemove', function(event){
        // console.log(event);

        if(mouseDown){
            // console.log("User has pressed the mouse down and is moving!!")
            //get the location of the mouse
            //set to null cuase we dont ahve one
            //the user has either just show up and we don't have a
            //or the user let go of the mouse and we
            if(lastMousePosition == null){
                lastMousePosition = {
                    // x: event.pageX,
                    // y: event.pageY

                    x: event.offsetX,
                    y: event.offsetY
                }

            }

            mousePosition.x = event.offsetX;
            mousePosition.y = event.offsetY;
            // console.log(event);
            // console.log(mousePosition.x)

            context.strokeStyle = color;

            context.lineWidth = thickness;
            context.beginPath();
            context.lineCap = "round";
            context.moveTo(lastMousePosition.x, lastMousePosition.y);
            context.lineTo(mousePosition.x, mousePosition.y);
            context.stroke();
            context.closePath();

            lastMousePosition = {
              x: mousePosition.x,
              y: mousePosition.y
            }

        }

    });


    $(document).ready(function(){

////CHAT START/////


         //Creating the client side script
    var socketio = io.connect('http://localhost:3000');

    // Send an event to the server
    socketio.emit('nameToServer',name);
    
//////// THE JOIN BUTTON ///// 
    $('#submitUser').submit(function(event){
        //prevent from repeating submission
        event.preventDefault();
        // console.log(name);  
        var name = $('#new-user').val();
        //coming from index.js
        //creates a tcp connection

        //sends an event to the server
        // console.log("TEST1");
        socketio.emit('nameToServer', name);
      
   });


    socketio.on('newUser', (userName)=>{
         event.preventDefault();
         console.log("TEST4")
        // console.log(userName + " just joined!")
            
        // goes through each name and selects it
        // $('#users').append(`<div id="users">${userName}</div>`);
        // console.log(userName);
        userName.forEach((elem) => {
           // console.log(userName);
           console.log(elem.name); 
            $('#users').append(`<div id="users">${elem.name}</div>`);
           // $('#messages').append(`<p>${elem.name} has joined the chat!</p>`);   
        })

        // $('#users').append(`<div id="users">${userName}</div>`);
        // $('#messages').prepend(`<p>${userName} has joined the chat!</p>`);

         console.log("TEST5")
           // console.log(newUsers);
    })
          
      

    $('#submit-message').submit(function(event){
        event.preventDefault();
        var name = $('#new-user').val();
        var newMessage = $('#new-message').val();
        console.log(newMessage)
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

    socketio.on('userDisconnect', (user)=>{
         user.forEach( (elem) => {   
           $('#messages').prepend(`<p>${elem} has left the chat!</p>`); 
        });
    });



    //UPLOAD PICTURE FUNCTION///

    //Bind the onchange event for the file input
    //using jQuery.
    // $('#imagefile').on('change', function(e){
    //     //Get the first (and only one) file element
    //     //that is included in the original event
    //     var file = e.originalEvent.target.files[0],
    //         reader = new FileReader();
    //     //When the file has been read...
    //     reader.onload = function(evt){
    //         //Because of how the file was read,
    //         //evt.target.result contains the image in base64 format
    //         //Nothing special, just creates an img element
    //         //and appends it to the DOM so my UI shows
    //         //that I posted an image.
    //         //send the image via Socket.io
    //         socketio.emit('user image', evt.target.result);
    //     };
    //         //And now, read the image and base64
    //         reader.readAsDataURL(file);  
    //     });


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


  




                    ///// END OF CHAT /////


      /////// CHANGE BACKGROUND OF GAME ///////

        $('#changeBG').click(function(){

          var bkImage1 = Math.ceil(Math.random() * 5);
          var bkImage2 = Math.ceil(Math.random() * 5);

          var image1 = "./images/p" + bkImage1 + ".jpg";
          var image2 = "./images/p" + bkImage2 + ".jpg";


          document.images.bkImage1.src = image1;
          document.images.bkImage2.src = image2;

        });


        $('#startEasy').click(function(){
            var wordList = [
                "cat,",
                " skateboard,",
                " mouse,",
                " whale,",
                " kite,",
                " banana,",
                " cow,",
                " house,",
                " tree,",
                " cookie"
            ];

            $('#message1').html(wordList)
            
        }); 



        $('#startFair').click(function(){
            var wordList = [
                "frog,",
                " pinwheel,",
                " lightsaber,",
                " cowboy,",
                " pirate,",
                " nature,",
                " garbage,",
                " teapot,",
                " America,",
                " bicycle"
            ];

            $('#message1').html(wordList);

        
        });

        $('#startHard').click(function(){
            var wordList = [
                "jungle,",
                " retail,",
                " glitter,",
                " vegetarian,",
                " commercial,",
                " jazz,",
                " braid,",
                " mad scientist,",
                " owl,",
                " myth"
            ];
            $('#message1').html(wordList);


        });

       
        ///Download picture function ///

        $('#doSnapshot').click(function(){
            html2canvas(document.getElementById("canvas"), {
                onrendered: function (canvas) {
                    var tempcanvas=document.createElement('canvas');
                    tempcanvas.width=500;
                    tempcanvas.height=500;
                    var context=tempcanvas.getContext('2d');
                    context.drawImage(canvas,112,0,500,500,0,0,500,500);
                    var link=document.createElement("a");
                    link.href=tempcanvas.toDataURL('image/jpg');   //function blocks CORS
                    link.download = 'screenshot.jpg';
                    link.click();
                }
            });

        });


         //CLEAR THE MESSAGE BOX

        $('#clearBox').click(function clearBox(){
            $('#message1').html("start");

        }); 

        
        // CLEAR THE CANVAS
        $('#clearPic').click(function(){
              context.clearRect(0, 0, canvas.width, canvas.height);

        });


    }); 
}
        
