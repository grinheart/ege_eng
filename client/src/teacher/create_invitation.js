import React from 'react';

class CreateInvitation extends React.Component {
    constructor(props) {
      super(props)

      this.state = {inv: ''};
    }

    submit = async () => {
      let resp = await this.props.request('create_invitation');
      if (resp['status'] == 'success') {
          this.setState({inv: this.props.text['invitationNumber'] + ': ' + resp['number']});
      }
      else {
            this.setState({inv: this.props.text['serverError']});
      }
    }

    render () {
     return (<div>
       <button onClick={this.submit}>{this.props.text['createInvitation']}</button>
       <div>{this.state.inv}</div>
     </div>)
    }
};

export default CreateInvitation;
