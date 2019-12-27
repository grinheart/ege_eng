import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import OptionButtons from './option_buttons';
import ValidatedForm from './validated_form';

const API = 'http://localhost:3001/';

class SignInForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {  authAsOptions: ['Student', 'Teacher'] };
      this.auth = this.props.auth;
      this.emptyMethods = {
        email: () => {},
        pwd: () => {}
      }
  }
  //constructor


    captcha = () => {
      return this.state.captcha != null;
    }


        validateFocusOut = async (name) => {
          await this.state.validate[name]();
          await this.setColor(name);
          await this.setErrorMsg();
        }

        validateChangedField = async (name, value) => {
          let isFieldChange = true;
          await this.state.validate[name]();
          await this.setColor(name, isFieldChange);
          await this.setErrorMsg(name, isFieldChange);
        }


async sign() {
  if (!this.state.captcha) {
      await this.setError('captcha', 'pleaseValidateThroughCaptcha', false);
      await this.setErrorMsg();
     return;
  }
  this.props.request('sign_in', {...this.state.params, user: this.props.as}).then((data) => {
    if (data.status == 'success') {
      this.auth();
    }
    else if (data.status == 'fail'){
      this.setError('in', 'incorrectCredentials', null);
    }
    else {
    this.setError('in', 'serverError', null);
    }
    this.setErrorMsg();
  });
}
  render() {
    return (
      <div>
      <OptionButtons options={this.props.options} changeOption={this.props.changeOption} type='auth' />
      <OptionButtons options={this.state.authAsOptions} changeOption={this.props.changeOption} type='authAs' />
      <ValidatedForm
        pattern={[
          {type: 'label', text: this.props.text['email']},
          {type: 'field',
                            type: 'text',
                            paramName: 'email',
                            validate: () => {}

                    },
          {type: 'label', text: this.props.text['pwd']},
          {type: 'field',
                            type: 'password',
                            paramName: 'pwd',
                            validate: () => {}

                    }
        ]}
        submit={this.sign}
        request={this.props.request}
        text={this.props.text}
        submitValue='sign_in'
        basicFieldChange={this.props.fieldChange}
        captcha={this.captcha}
        setToken={this.props.setToken}
        setStyles={this.props.setStyles}
        setCaptcha={this.setCaptcha}
        as={this.props.as}
        extra={{auth: this.props.auth}}
      />
      </div>
  )
  }
}

export default SignInForm;
