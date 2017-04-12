////////////////////////////
/////// HTTP PORTION ///////
////////////////////////////

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}

/////////////////////////////
///////  WEB SOCKETS  ///////
/////////////////////////////

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		socket.on('led', function(data){
			brightness = data;
			// console.log('brightness: ' + brightness);

			sendBrightness();
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});

		function sendBrightness(){
			// send as a string
			myPort.write(brightness.toString());
			console.log(brightness);
		}
	}
);


////////////////////////////
/////// SERIAL STUFF ///////
////////////////////////////

//npm install serialport
var serialport = require ('serialport');

// make a local instance of the library
var SerialPort = serialport.SerialPort;

// FIRST - list all the serial ports
// we need to find the one that our arduino is on
serialport.list(function(err, ports){
	// once we know our port, we comment this code out
	ports.forEach(function(port){
		console.log(port.comName);
	});
});

// get the port from the command line
// port that the board is connect to 
var portName = '/dev/cu.usbmodem1421';

// open the port

var myPort = new SerialPort(portName, {
	baudRate: 9600,
	parser: serialport.parsers.readline('\n')
});


myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);
// function showPortOpen written here
function showPortOpen(){
	console.log('port opened. data rate: ' + myPort.options.baudRate);
}

function sendSerialData(data){
	// console.log('sensor: ' + data);
	io.sockets.emit('sensor', data);
}

function showPortClose(){
	console.log('port closed.');
}

function showError(error){
	console.log('serial port error: ' + error);
}

