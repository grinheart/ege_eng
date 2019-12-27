import React from 'react';
import Workspace from './workspace';
import SignForm from './sign_form';

class Main extends React.Component {
    constructor(props) {
      super(props)
    }

    showLoading = () => {
        return(<div>Loading...</div>);
    }

    showSignForm = () => {
        return(<SignForm text={this.props.text}
        request={this.props.request}
        fieldChange={this.props.fieldChange}
        type={this.props.type}
        as={this.props.as}
        setStyles={this.props.setStyles}
        options={this.props.options}
        changeOption={this.props.changeOption}
        auth={this.auth}/>);
    }

    showWorkspace = () => {
      return(<Workspace
      request={this.props.request}
      switchComponent={this.props.switchComponent}
      loading={this.showLoading}/>);
    }

    render () {
      alert(this.props.type);
     return (<div>
       {this.switchComponent(this.props.to[null, true, false])}
     </div>)
    }
};

export default Main;
