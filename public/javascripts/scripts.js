//Creating the client side script

var socket = io();
$('#submit-message').submit(function(event){
    event.preventDefault();
        var name = $('#new-user').val();
        var newMessage = $('#new-message').val();
        socketio.emit('messageToServer', {
            newMessage:newMessage,
            name: name

            }); 


    });
    
    socketio.on('messageToClient', (message)=>{
        var now = new Date(Date.now());
        var uiFormat = now.getHours() + ":" + now.getMinutes(); 
        console.log(uiFormat); 

        $('#messages').prepend('<p> ' + message +  ' (' +uiFormat+ ')' + '</p>'); 


    });


           






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

function changeBG(){

  var bkImage1 = Math.ceil(Math.random() * 5);
  var bkImage2 = Math.ceil(Math.random() * 5);

  var image1 = "./images/p" + bkImage1 + ".jpg";
  var image2 = "./images/p" + bkImage2 + ".jpg";


  document.images.bkImage1.src = image1;
  document.images.bkImage2.src = image2;
}

function startEasy(){

    var oneMinute = 60 * 1;
    display = document.querySelector('#time');
    startTimer(oneMinute, display);
    clearInterval(oneMinute);


    var wordList = [
        "cat",
        " skateboard",
        " mouse",
        " whale",
        " kite",
        " banana",
        " cow",
        " house",
        " tree",
        " cookie"
    ];

    document.getElementById('message1').innerHTML = [wordList];
}



function startFair(){

    var oneMinute = 60 * 3;
    display = document.querySelector('#time');
    startTimer(oneMinute, display);
    clearInterval(oneMinute);


    var wordList = [
        "frog",
        " pinwheel",
        " lightsaber",
        " cowboy",
        " pirate",
        " nature",
        " garbage",
        " teapot",
        " America",
        " bicycle"
    ];
    document.getElementById('message1').innerHTML = [wordList];

}

function startHard(){

    var someMinutes = 60 * 3;
    display = document.querySelector('#time');
    startTimer(someMinutes, display);
    clearInterval(oneMinute);


    var wordList = [
        "jungle",
        " retail",
        " glitter",
        " vegetarian",
        " commercial",
        " jazz",
        " braid",
        " mad scientist",
        " owl",
        " myth"
    ];
    document.getElementById('message1').innerHTML = [wordList];

}

function clearBox(){
    document.getElementById('message1').innerHTML = "start";
    document.getElementById('message2').innerHTML = "Instructions";


}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
    clearInterval(timer);

}


var doSnapshot = function() {
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

}

function howTo(){
  document.getElementById('message2').innerHTML = "First, choose your level of difficulty." + " Second, draw as many pictures from the word box as you can under three minutes."+" After you've finished drawing the picture, click 'Add' to get the picture stored."+ " Next, ask a friend to click on 'Challenge Friend' to see how many of your pictures they can guess.";

}

function clearPic(){
      context.clearRect(0, 0, canvas.width, canvas.height);
}