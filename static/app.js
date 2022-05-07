const socket = io();

        socket.emit('hello', "hello world");
        socket.on('hello',msg=> {
            //document.getElementById("message").innerHTML += msg;
        });

socket.emit('getUser', connectedUser)

function connectedUser(user) {
    
    document.getElementById("connectedUser").innerHTML = user;
}

document.querySelectorAll(".msg-info-time").forEach(n=> {
    n.innerHTML = new Date().toTimeString().split(" ")[0];
})