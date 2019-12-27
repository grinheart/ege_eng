import React from 'react';
import ValidatedForm from '../validated_form';

class Task2 extends React.Component {
  constructor(props) {
    super(props);
  }


      async submit() {
        let valid = true;
        if (this.state.params.explanation.length == 0) {
          await this.setError('explanation', 'explanationAbsence', null);
          valid = false;
        }
        if (this.state.params.questions.length == 0) {
          await this.setError('questions', 'questionAbsence', null);
          valid = false;
        }
        if (this.state.params.questions.split("\n").length != 5) {
          await this.setError('questions', 'not5questions', null);
          valid = false;
        }
        if (valid) {
          await this.setError('explanation', 'empty', null);
          await this.setError('questions', 'empty', null);
          await this.submitOnSuccess();
        }
        await this.setErrorMsg();
      }

      async validateExp() {
        if (this.state.params.explanation.length != 0) {
            await this.setError('explanation', 'empty', null);
        }
      }

      async validateQu() {
        if (this.state.params.questions.length != 0) {
            await this.setError('questions', 'empty', null);
        }
      }



  render() {
    return(<ValidatedForm
      pattern={[
        {type: 'field',
                        type: 'textarea',
                        paramName: 'explanation',
                        validate: this.validateExp
               },
        {type: 'label', text: 'In 1.5 minutes you are to ask five questions to find out the following:'},
        {type: 'field',
                          type: 'textarea',
                          paramName: 'questions',
                          validate: this.validateQu
                 },
        {type: 'label', text: this.props.text['promo']},
        {type: 'field',
                          type: 'input',
                          paramName: 'promo',
                          validate: () => {}
                 },
        {type: 'label', text: this.props.text['image']},
        {type: 'field',
                          type: 'file',
                          accept: 'image/png, image/jpeg',
                          paramName: 'image',
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
      extra={{number: 2,
              submitOnSuccess: this.props.submitOnSuccess
            }}
    />)
  }
}

export default Task2;
