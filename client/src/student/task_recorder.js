import React from 'react';
import Recorder from './recorder.js'
import { Spring } from 'react-spring/renderprops';

class TaskRecorder extends React.Component {
    constructor(props) {
      super(props)
      this.state = {text: null,
                    recordKey: null,
                    timerStarted: null,
                    permissionFail: 'empty',
                    timer: true,
                    time: this.props.readingTime
                   }

      this.answerTime = this.props.answerTime;
      this.readingTime = this.props.readingTime;
      this.number = this.props.number;

      props.request('task', {
        series_key: props.seriesKey,
        id: props.id,
        number: this.number
      }).then(resp => {
        if (resp['status'] == 'success') {
          console.log('success');
          console.log(resp);
          this.setState({
              recordKey: resp['record_key'],
              timerStarted: 1
            },
            this.readingSession);
          this.props.setTask(resp['task']);
        }
        else {
          this.setState({text: props.text['serverError']})
        }
      })
    }

    readingSession = () => {
      this.timeout = setTimeout(() => {
          this.setState({timerStarted: 2, time: this.answerTime});
      },
      this.readingTime);
    }

    nextStep = () => {
      if (this.state.timerStarted == 1) {
          this.setState({timerStarted: 2, time: this.answerTime}, this.startRecording);
          this.props.recordingStarted();
      }
      else {
        this.props.end();
      }
    }

    startRecording = async () => {
      this.recorder = new Recorder({
        audioHandler: this.sendAudio
      });
      this.setState({timer: false});
      this.recorder.setup().then(
        async (r) => {
          this.setState({timer: true});
          r.record(this.answerTime).then(audio => {
            this.sendAudio(audio);
            clearTimeout(this.timeout);
            this.props.end();
          });
        },
        () => {
          this.setState({permissionFail: 'recordNotAllowed'});
        }
      );
    }

    sendAudio = async (audio) => {
      let data = {
        series_key: this.props.seriesKey,
        id: this.props.id,
        number: this.number,
        audio: audio
      }

      this.props.request('task', data);
    }

    render () {
     return (<div>
       {this.state.timer ?
         <div style={{borderWidth: 2, borderStyle: 'solid', width: 1000}} key={this.state.timerStarted}>
           <Spring from={{width: 0}} to={{width: 1000}} config={{duration: this.state.time}}>
           {props => (
               <div style={{backgroundColor: '#9f9', height: 100, ...props}}></div>
           )}
         </Spring>
         </div>
       : this.props.loading()}
       <button onClick={this.nextStep}>{this.props.text['ready']}</button>
       <br />{this.props.text[this.state.permissionFail]}
     </div>)
    }
};

export default TaskRecorder;
