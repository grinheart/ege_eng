import React from 'react';
import Task1 from './task1'
import Task2 from './task2'
import Recorder from './recorder'

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        curTask: null,
        permissionFail: 'empty'
      }
    }

    startButton = () => {
      return(<div>
        <button onClick={this.start}>{this.props.text['startSeries']}</button>
        </div>);
    }

    start = async () => {
      let keys = await this.props.request('start_task');
      if (keys['status'] == 'success') {
        this.seriesKey = keys['series_key'];
        this.ids = keys['task_ids']
        await this.setState({ fail: null, curTask: false });
      }
      else {
        await this.setState({fail: this.props.text['serverError']})
      }
    }

    audioTest = () => {
      this.recorder = new Recorder();
      this.recorder.setup().then(
        async (r) => {
          this.setState({permissionFail: 'empty'});
          r.record(30000).then(audio => {
            console.log('playing');
            audio.play();
          });
        },
        () => {
          this.setState({permissionFail: 'recordNotAllowed'});
        }
      );
    }

    replay = () => {
      if (this.recorder) {
        this.recorder.stop();
      }
    }

    stopTest = () => {
      if (this.recorder) this.recorder.pause();
      this.setState({curTask: 1});
    }

    micCheck = () => {
      return(<div>
        {this.props.text['micCheck']}
        <button onClick={this.audioTest}>{this.props.text['start']}</button>
        <br />
        <button onClick={this.replay}>{this.props.text['replay']}</button>
        <br />
        <button onClick={this.stopTest}>{this.props.text['finish']}</button>
        <br />
        {this.props.text[this.state.permissionFail]}
      </div>)
    }

    showTask1 = () => {
      return(<div>
          <Task1
          seriesKey={this.seriesKey}
          id={this.ids[0]}
          recordKey={this.recordKey}
          loading={this.props.loading}
          text={this.props.text}
          request={this.props.request}
          end={this.firstTaskEnds} />
      </div>)
    }

    firstTaskEnds = () => {
      this.setState({curTask: 2})
    }

    showTask2 = () => {
      return(<div>task2
            <Task2
            seriesKey={this.seriesKey}
            id={this.ids[1]}
            recordKey={this.recordKey}
            loading={this.props.loading}
            text={this.props.text}
            request={this.props.request}
            end={this.end} />
      </div>)
    }

    end = () => {
      return(<div>{this.props.text['answerRecorded']}<button>{this.props.text['startAgain']}</button></div>)
    }

    render () {
     return (<div>
       {this.props.switchComponent(this.state.curTask, [null, false, 1, 2, true], [this.startButton, this.micCheck, this.showTask1, this.showTask2, this.end])}
       {this.state.fail}{this.state.fail}
       </div>);
    }
};

export default Main;
