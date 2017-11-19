var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();
	this.reverbNode	 = context.createConvolver();
	var ir = new XMLHttpRequest();
	ir.open("Get","ir.wav",true);
	ir.responseType = "arraybuffer";
	var buff = ir.response;
	ir.onload = function (){
	context.decodeAudioData(buff, function(buffer){
		this.reverbNode.buffer = buffer;
	});
}
	ir.send();

	this.wetGain = context.createGain();
	this.dryGain = context.createGain();

	this.input.connect(this.reverbNode);
	this.reverbNode.connect(this.wetGain);
	this.input.connect(this.dryGain);

	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);
	this.parameters = parameters;

}


Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'reverb_time':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;
	}
}
Reverb.prototype.connect = function(node) {
	this.context.destination = node.input;
}
