var context = new (window.AudioContext || window.webkitAudioContext)();

var buffers = new Array(5);
bellCtrl = context.createGain();
peopleCtrl = context.createGain();
bonfireCtrl = context.createGain();
fireworksCtrl = context.createGain();
chantCtrl = context.createGain();
var volumeCtrl = [bellCtrl, peopleCtrl, bonfireCtrl, fireworksCtrl, chantCtrl];


var bell = new XMLHttpRequest();
bell.open("Get","bell.wav",true);
bell.responseType = "arraybuffer";
source1 = context.createBufferSource();
bell.onload = function(){
		context.decodeAudioData(bell.response, function(buffer){source1.buffer = buffer;});
}
bell.send();


var people = new XMLHttpRequest();
people.open("Get","people.mp3",true);
people.responseType = "arraybuffer";
source2 = context.createBufferSource();
people.onload = function(){
		context.decodeAudioData(people.response, function(buffer){source2.buffer = buffer;});
}
people.send();

var bonfire = new XMLHttpRequest();
bonfire.open("Get","bonfire.wav",true);
bonfire.responseType = "arraybuffer";
source3 = context.createBufferSource();
bonfire.onload = function(){
		context.decodeAudioData(bonfire.response, function(buffer){source3.buffer = buffer;});
}
bonfire.send();

var fireworks = new XMLHttpRequest();
fireworks.open("Get","fireworks.mp3",true);
fireworks.responseType = "arraybuffer";
source4 = context.createBufferSource();
fireworks.onload = function(){
		context.decodeAudioData(fireworks.response, function(buffer){source4.buffer = buffer;});
}
fireworks.send();

var chant = new XMLHttpRequest();
chant.open("Get","chant.mp3",true);
chant.responseType = "arraybuffer";
source5 = context.createBufferSource();
chant.onload = function(){
    context.decodeAudioData(chant.response, function(buffer){source5.buffer = buffer;});
}
chant.send();


function changegain(i,changedvalue){
		volumeCtrl[i].gain.value = changedvalue/100;
}

function playonload(){
	bellCtrl.gain.value = 0.15;
  fireworksCtrl.gain.value = 0.25;
  bonfireCtrl.gain.value = 0.2;
	chantCtrl.gain.value = 0.7;
	peopleCtrl.gain.value = 0.1;

  source1.start();
  source1.connect(bellCtrl);
  bellCtrl.connect(context.destination);
  source1.loop = true;

  source2.start();
  source2.connect(peopleCtrl);
  peopleCtrl.connect(context.destination);
  source2.loop = true;

  source3.start();
  source3.connect(bonfireCtrl);
  bonfireCtrl.connect(context.destination);
  source3.loop = true;

  source4.start();
  source4.connect(fireworksCtrl);
  fireworksCtrl.connect(context.destination);
  source4.loop = true;

  source5.start();
  source5.connect(chantCtrl);
  chantCtrl.connect(context.destination);
  source5.loop = true;



}
