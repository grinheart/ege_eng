class Recorder {
  constructor(options) {
    for (let key in options) {
      this[key] = options[key]
    }
    this.audioChunks = [];
  }

  addChunk = (e) => {
    this.audioChunks.push(e.data);
  }

  stopRecord = () => {
    console.log('forming a record...')
    this.audioBlob = new Blob(this.audioChunks);
    this.audioUrl = URL.createObjectURL(this.audioBlob);
    this.audio = new Audio(this.audioUrl);
    this.resolveRecord(this.audio);
  }

  configure = (stream) => {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.addEventListener("dataavailable", this.addChunk);
    this.mediaRecorder.addEventListener("stop", this.stopRecord);
  }



  setup = () => {
      console.log('setup');
      return new Promise(async (resolve, reject) => {
        let getUserMedia = navigator.mediaDevices.getUserMedia({ audio: true })
        console.log('promise');
        getUserMedia.then(stream => {
          this.configure(stream);
          console.log('resolve');
          resolve(this);
        },
        () => {
          console.log('reject');
          reject();
          throw "The user hasn't allowed to record audio";
        }
        );
      });
  }

  record = async (length = 1000000) => {
          this.audioChunks = [];
          this.mediaRecorder.start();
          return new Promise((resolve, reject) => {
                this.resolveRecord = resolve;
                setTimeout(() => {
                  this.stop();
                }, length);
            }
          )
  }

  stop = () => {
      this.mediaRecorder.stop();
      console.log('i stopped');
      /*if (this.audioHandler) {
        this.audioHandler(this.audioBlob);
      }*/
  }

  play = () => {
    this.audio.play();
  }

  pause = () => {
    this.audio.pause();
  }

}

export default Recorder;
