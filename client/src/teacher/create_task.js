import React from 'react';
import OptionButtons from '../option_buttons';
import Task1 from './task1';
import Task2 from './task2';

class CreateTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {currentTask: 1};
      this.options = [1, 2, 3, 4];
    }

    async submitOnSuccess() {
      //let response={};
      //let response = await this.props.request('create_task', {...this.state.params,  number: this.number});
      let data = new FormData();
      //data.append('d', this.state.params['promo']);
      //data.append('image[]', this.state.files['image'], this.state.files['image'].name);
      for (let key in this.state.files) {
        data.append(key + '_file', this.state.files[key]);
      }
      for (let key in this.state.params) {
        data.append(key, this.state.params[key]);
      }
      data.append('number', this.number);
      //let response = await this.props.request('create_task', data, null);
      let options = {
        method: 'POST',
        body: data,
        credentials: 'include'
      }
      let response = await fetch(`http://localhost:3001/create_task`, options);
      response = await response.json();
      //    response = await this.props.request('create_task', this.state.files['image'], false);
      console.log(response);
      if (response['status'] == 'success') {
          let validation = this.state.validation;
          validation['send'] = true;
          validation.msgs['send'] = '';
          for (let key in this.state.params) {
            this.state.params[key] = ''
          }
          await this.setState({params: this.state.params});
      }
      else {
        let validation = this.state.validation;
        validation['send'] = true;
        validation.msgs['send'] = 'serverError'; //DOUBLE CODE
        this.setErrorMsg();
      }
      console.log('request', response);
    }

    changeOption = (e, option) => {
        this.setState({currentTask: option});
    }

    tasks = [
      () => {
        return(<div><Task1
                      request={this.props.request}
                      text={this.props.text}
                      fieldChange={this.props.fieldChange}
                      setStyles={this.props.setStyles}
                      submitOnSuccess={this.submitOnSuccess}
                    />
               </div>);
      },
      () => {
        return(<div><Task2
                      request={this.props.request}
                      text={this.props.text}
                      fieldChange={this.props.fieldChange}
                      setStyles={this.props.setStyles}
                      submitOnSuccess={this.submitOnSuccess}
                    /></div>);
      },
      () => {
        return(<div>3</div>);
      },
      () => {
        return(<div>4</div>);
      }
    ]


    render () {
     return (<div>
       <OptionButtons changeOption={this.changeOption} options={this.options}/>
       {this.props.switchComponent(this.state.currentTask, this.options, this.tasks)}
     </div>)
    }
};

export default CreateTask;
//this.props.request('user_type')['type']
