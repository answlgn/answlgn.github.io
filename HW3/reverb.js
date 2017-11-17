var Reverb = function(context, parameters) {


	this.context = context;
	this.input = context.createGain();
	this.reverbNode = context.createConvolver();
	this.ir = new XMLHttpRequest();
	this.ir.open("Get","ir.wav",true);
	this.ir.responseType = "arraybuffer";

	this.ir.onload = function() {
  	this.audioData = context.decodeAudioData(this.ir.response, function(buffer) {
      this.result = buffer;
      this.soundSource = context.createBufferSource();
      this.soundSource.buffer = this.result;
    });
	}
  this.ir.send();

	//this.reverbNode.buffer = this.ir.response;
	//this.ir.send();
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
