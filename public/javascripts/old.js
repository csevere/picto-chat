   ///CLIENT SIDE 

   // event.preventDefault();
      
        // for(i = 0; i < newUsers.length; i++){
        //     //prevents someone from joining chat with a name already in the array
        //     if(newUsers.indexOf(i) <= -1){
        //         // console.log(newUsers);
        //         //create new variable that will be assigned the last index in the array to display in users div
        //         var user = (newUsers.slice(-1)[0])
        //     }
        //     // console.log(newUsers.slice(-1)[0]) 
        // }

        // $('#users').append(`<div id="users">${user}</div>`);
        // $('#messages').prepend(`<p>${user} has joined the chat!</p>`); 



///SERVER SIDE

    // if(newUsers.indexOf(name) <= -1){
        //  // console.log(name + " just joined.");
        //  // console.log("TEST3")
        //  newUsers.push(name); 
        //  // console.log("line57 " + name.id) <<< doesn't works
        //  // var userlist = newUsers.shift();
        //  console.log("line 58 " + newUsers);
        //  io.sockets.emit('newUser',newUsers);
        //  // io.sockets.emit('newUser', userlist);
        // }