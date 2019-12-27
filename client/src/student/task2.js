import React from 'react';
import TaskRecorder from './task_recorder.js'

class Task2 extends React.Component {
    constructor(props) {
      super(props)

      this.readingTime = 1.5*60*1000;
      this.answerTime  = 20*5*1000;
      this.number = 2;

      this.state = {
                     task: null,
                     recording: false,
                     question: null,
                   }
    }

    getTask = (task) => {
      console.log(task);
      this.setState({task: task})
    }

    showTask = () => {
      return(
        <div>
          <img src={this.state.task.imgUrl} />
          <br />
          {this.state.task.promo} <br />
          {this.state.task.problem}
          In 1.5 minutes you are to ask five direct questions to find out the following:
          {this.state.task.questions.join(<br />)} <br />
          You will have 20 seconds to ask each question.
        </div>
      );
    }

    recordingStarted = () => {
        this.setState({question: 1})
        setInterval(
          () => {
              this.setState({question: this.state.question + 1})
          },
          20*1000
        )
    }

    render () {
     return (<div>
       Study the advertisement.<br />
       {this.state.task && !this.state.recording ? this.showTask() : null}<br /><br />
       {this.state.question ? this.state.task.questions[this.state.question] : null}
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
     <button onClick={this.nextQuestion}>{this.props.text['nextQuestion']}</button>
     </div>)
    }
};

export default Task2;
