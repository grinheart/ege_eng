import React from 'react';
import Main from './student/main';
import CreateTask from './teacher/create_task';
import CreateInvitation from './teacher/create_invitation';

class Workspace extends React.Component {
    constructor(props) {
      super(props)

      this.state = {userType: null}
      props.request('user_type').then((value) => {
        this.setState({userType: value['type']});
      });
    }

    showStudentWorkspace = () => {
      return (<Main text={this.props.text} request={this.props.request} switchComponent={this.props.switchComponent} loading={this.props.loading} />);
    }

    showTeacherWorkspace = () => {
      return (<div><CreateTask
                    switchComponent={this.props.switchComponent}
                    request={this.props.request}
                    text={this.props.text}
                    fieldChange={this.props.fieldChange}
                    setStyles={this.props.setStyles}
                    />
                    <hr />
                    <CreateInvitation
                    text={this.props.text}
                    request={this.props.request}
                    />
              </div>);
    }

    render () {
     return (<div>
       {this.state.userType == null? this.props.loading() : this.props.switchComponent(this.state.userType, ['Student', 'Teacher'], [this.showStudentWorkspace, this.showTeacherWorkspace])}
     </div>)
    }
};

export default Workspace;
//this.props.request('user_type')['type']
