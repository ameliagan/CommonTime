var http = require('http');
var fs = require('fs');

//load paths internally 
var index = fs.readFileSync('public/index.html');
var javascript = fs.readFileSync('public/mySketch.js');
var SerialPort = require('serialport');

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('COM6',{ 
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);

//send request, return responses based on req 
//html response status code - 200 

var app = http.createServer(function(req,res){
  if(req.url == '/'){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(index);
  } else if(req.url == '/mySketch.js'){
    res.writeHead(200,{'Content-Type':'text/javascript'});
    res.end(javascript);
  }
});

var io = require ('socket.io').listen(app);
io.on('connection', function(data){
  console.log('node.js is working');

});

parser.on ('data', function (data){
  // console.log(data);
  console.log('Received data from port: ' + data);
  io.emit('data',data);
});

app.listen(3000);