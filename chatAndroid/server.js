var express = require('express')
//also add dependency to package.json
var socket = require('socket.io')
var bodyParser = require('body-parser')
var app = express()

const a =[
    {
        message: "hello world!"
    },
    {
        message: "hello world!!"
    }   
] 

//MiddleWear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'))


var server = app.listen(8000,function(err){
    if(err) throw err
    else{
        console.log('Listening to port 8000')
    }
})
var io = socket(server)

app.post('/', function(req,res){
    console.log(req.body)
    res.json(a)
})

app.get('/',function(req,res){
    console.log(req.query)
    res.sendStatus(200)
})



io.on('connection',function(socket){
    console.log('Client connected to server', socket.id)
    socket.on('chat',function(data){
      io.sockets.emit('chat',data)
    })
})