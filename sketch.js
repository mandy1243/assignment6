// P5 STUFF ONLY
var size;
function setup() {
	createCanvas(400, 400);
	// background(255);
}

function draw() {
	background("#57C9CF");

	// brightness = Math.floor(map(mouseX, 0, width, 0, 255));
	brightness = 0;
if(keyIsPressed){
	if (keyCode == UP_ARROW){
    	ellipse(50, 50, 50, 50);
    	brightness = 50;
    }

    if(keyCode == DOWN_ARROW){
    	rect(25, 25, 50, 50);
		brightness = 100;
	}
    if (keyCode == LEFT_ARROW){
     	triangle(23, 75, 50, 20, 78, 75);
     	brightness = 200;
    }

    if (keyCode == RIGHT_ARROW){
     	triangle(23, 75, 50, 20, 78, 75);
     	brightness = 150;
    }
}


	socket.emit('led', brightness);
	console.log(brightness);

	// changeBG();


	print(keyCode);
	socket.emit('led', brightness);
	console.log(brightness);
	
}

////////////////////////////////////////////////

// all non-p5 javascript needs to go inside init() 
// so that this code executes only AFTER the page has loaded

function init(){

	// SOCKET STUFF
	var socket = io.connect();

	socket.on('connect', function() {
		console.log("Connected");
	});

	// socket.on('sensor', function(data){
	// 	console.log(data);
	// 	size = Number(data);
	// });

}

window.addEventListener('load', init);


