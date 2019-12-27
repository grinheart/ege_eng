import React from 'react';
import TaskRecorder from './task_recorder.js'

class Task1 extends React.Component {
    constructor(props) {
      super(props)

      this.readingTime = 1.5*60*1000;
      this.answerTime = this.readingTime;
      this.number = 1;

      this.state = {
                     task: null,
                     recording: false
                   }
    }

    getTask = (task) => {
      console.log('gettask');
      this.setState({task: task})
    }

    recordingStarted = () => {
      this.setState({recording: true})
    }

    render () {
     return (<div>
       Task 1. Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.<br /><br />
       {this.state.task? this.state.task : this.props.loading()}<br /><br />
        {this.state.recording ? this.props.text['readOutLoud'] : null}
       <TaskRecorder
          setTask={this.getTask}
          readingTime={this.readingTime}
          answerTime={this.answerTime}
          number={this.number}
          request={this.props.request}
          text={this.props.text}
          seriesKey={this.props.seriesKey}
          id={this.props.id}
          end={this.props.end}
          loading={this.props.loading}
          recordingStarted={this.recordingStarted}
       />
     </div>)
    }
};

export default Task1;
