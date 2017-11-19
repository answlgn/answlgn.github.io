var Reverb = function(context, parameters, context2) {

	this.context = context;
	this.input = context.createGain();
	this.output = context.createGain();

	var reverbNode	 = context.createConvolver();
	var ir = new XMLHttpRequest();
	// used  IR at St John's Church - Wolverhampton from http://www.openairlib.net/auralizationdb, by Dr Aglaia Foteinou, Eleni Tavelidou, Josh Pritchett
	ir.open("Get","ir.wav",true);
	ir.responseType = "arraybuffer";
	ir.onload = function (){
		context.decodeAudioData(ir.response, function(buffer){
		reverbNode.buffer = buffer;
	});
}
	ir.send();

	this.wetGain = context.createGain();
	this.dryGain = context.createGain();

	this.input.connect(reverbNode);
	reverbNode.connect(this.wetGain);
	this.input.connect(this.dryGain);

	this.dryGain.connect(this.output);
	this.wetGain.connect(this.output);

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
	this.output.connect(node.input);
}
