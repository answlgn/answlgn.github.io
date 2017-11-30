var context = new (window.AudioContext || window.webkitAudioContext)();

var buffers = new Array(5); // 0 : bell, 1 : people, 2 : snow
var volume_id = new Array("BellCtrl","PeopleCtrl","SnowCtrl","FireworksCtrl","CarolCtrl");
var gain_nodes = new Array(5);

for (i  = 0; i < 5; i++) {
		gain_nodes[i] = context.createGain();
		var vol = document.getElementById(volume_id[i]).value;
		gain_nodes[i].gain.value = db2gain(vol);
}

var bell = new XMLHttpRequest();
bell.open("Get","bell.wav",true);   //  <---- replace this file with yours
bell.responseType = "arraybuffer";
bell.onload = function(){
		context.decodeAudioData(bell.response, function(buffer){buffers[0] = buffer;});
}
bell.send();

var people = new XMLHttpRequest();
people.open("Get","people.mp3",true);  //  <---- replace this file with yours
people.responseType = "arraybuffer";
people.onload = function(){
		context.decodeAudioData(people.response, function(buffer){buffers[1] = buffer;});
}
people.send();

var snow = new XMLHttpRequest();
snow.open("Get","snow.wav",true);  //  <---- replace this file with yours
snow.responseType = "arraybuffer";
snow.onload = function(){
		context.decodeAudioData(snow.response, function(buffer){buffers[2] = buffer;});
}
snow.send();

var fireworks = new XMLHttpRequest();
fireworks.open("Get","fireworks.wav",true);  //  <---- replace this file with yours
fireworks.responseType = "arraybuffer";
fireworks.onload = function(){
		context.decodeAudioData(fireworks.response, function(buffer){buffers[3] = buffer;});
}
fireworks.send();



function play(i) {
			source = context.createBufferSource();
			source.buffer=buffers[i];
			source.connect(gain_nodes[i]);
			gain_nodes[i].connect(context.destination);
			source.start();
}

function changegain(i,changedvalue){
		gain_nodes[i].gain.value = db2gain(changedvalue);
}

function db2gain(db_gain){
		var gain = 1.0;
		//
		//
		gain = Math.pow(10,(db_gain)/20);
		//
		//
		return gain
}

// keyboard mapping
function playall() {
	for (i  = 0; i < 5; i++) {
			play(i)
	}
}
