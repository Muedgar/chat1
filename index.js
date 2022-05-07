const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").Server(app);

const io = require("socket.io")(server);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/static',express.static('./static/'));
app.use('/cssfiles',express.static('./cssfiles/'));

var currentUser = null;
var usersCount = 0;
io.on('connection',socket => {
    console.log(socket.id);
    socket.user = currentUser;
    usersCount++;
    socket.on('hello',msg=> {
        socket.emit('hello',msg);
    });
    socket.on('getUser',cb => {
        cb(socket.user);
    });
    socket.on('sendMessage',(PERSON_NAME, PERSON_IMG, dir, msgText) => {
        console.log("sending message",PERSON_NAME, PERSON_IMG, dir, msgText);
        socket.broadcast.emit('receiveMessage',PERSON_NAME, PERSON_IMG, dir, msgText);
    });
});
io.on('disconnect',()=>{
    usersCount--;
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/getChat/:user',(req,res)=> {
    currentUser = req.params.user;
    console.log(currentUser,req.params);
    res.status(200).json(currentUser);
});

app.get('/getUserFromBackEnd', (req,res)=> {
    res.status(200).json({currentUser});
});

app.get('/getChat',(req,res)=>{
    res.sendFile(__dirname+'/public/chat.html');
});

server.listen(3000,()=> {
    console.log(`app running on : http://localhost:3000/`);
});