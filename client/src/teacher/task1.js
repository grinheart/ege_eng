import React from 'react';
import ValidatedForm from '../validated_form';

class Task1 extends React.Component {
  constructor(props) {
    super(props);
  }

      async submit() {
        let validation = this.state.validation;
        if (this.state.params.text.length > 0) {
          await this.submitOnSuccess();
          validation.msgs['send'] = '';
          }
        else {
          validation['send'] = false;
          validation.msgs['send'] = 'fillEmptyFields';
        }
        this.setErrorMsg();
      }


  render() {
    return(<ValidatedForm
      pattern={[
        {type: 'label', text: 'Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.'},
        {type: 'field',
                          type: 'textarea',
                          paramName: 'text',
                          validate: () => {}
                 }
      ]}
      submit={this.submit}
      request={this.props.request}
      text={this.props.text}
      captchaDisabled={true}
      basicFieldChange={this.props.fieldChange}
      setStyles={this.props.setStyles}
      submitValue='sendTask'
      extra={{number: 1,
              submitOnSuccess: this.props.submitOnSuccess
            }}
    />)
  }
}

export default Task1;
