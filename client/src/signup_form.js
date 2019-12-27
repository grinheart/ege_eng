import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import OptionButtons from './option_buttons';
import ValidatedForm from './validated_form';

const API = 'http://localhost:3001/';

class SignUpForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {  authAsOptions: ['Student', 'Teacher'] };
      this.auth = this.props.auth;

      this.extra = {
        userNotExist: this.userNotExist,
        invitationExists: this.invitationExists,
        auth: this.auth,
        lastCheck: this.lastCheck
      }

      console.log('auth', this.props);
  }
  //constructor


  //validations
  async validateEmail() {
      let email = this.state.params.email;
      if (!email)
           await this.setError('email', 'empty', null);

      else {
        let format = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;
        if (format.test(email))
            await this.setError('email', 'empty', true);
        else
          await this.setError('email', 'emailFormatErr', false);
      }
  }

  async validatePwd() {
    let pwd = this.state.params.pwd;
    if (!pwd) {
      await this.setError('pwd', 'empty', null);
      await this.setError('pwdConfirm', 'empty', null);
      await this.setColor('pwdConfirm');
    }

    else if (pwd.length > 6) {
        await this.setError('pwd', 'empty', true);
         if (pwd != this.state.params.pwdConfirm) {
          if (this.state.params.pwdConfirm != '') {
            await this.setError('pwdConfirm', 'pwdConfirmNotMatch', false);
            await this.setColor('pwdConfirm');
          }
          else {
           await this.setError('pwdConfirm', 'empty', null);
           await this.setColor('pwdConfirm');
          }
        }
        else {
          await this.setError('pwdConfirm', 'empty', true);
          await this.setColor('pwdConfirm');
        }
      }

    else {
      await this.setError('pwd', 'pwdFormatErr', false);
      await this.setError('pwdConfirm', 'empty', null);
      await this.setColor('pwdConfirm');
    }
  }

  async validatePwdConfirm() {
    let pwd = this.state.params.pwdConfirm;
    if (!pwd || this.state.params.pwd == '')
      await this.setError('pwdConfirm', null, null);

    else if (this.state.params.pwd == pwd)
      await this.setError('pwdConfirm', 'empty', true);

    else
      await this.setError('pwdConfirm', 'pwdConfirmNotMatch', false);
  }

  async validateInvitation() {
    let inv = this.state.params.invitation;
    if (!inv) {
      await this.setError('invitation', null, null);
    }
    else if (/[0-9]{6}/.test(inv)) {
      await this.setError('invitation', 'empty', true);
    }
    else {
      await this.setError('invitation', 'invalidInvitation', false);
    }
  }

    async lastCheck() { //checks fields when "sign up" is clicked
        let valid = true;
        for (let key in this.state.validate) {
          await this.state.validate[key]();
          if (!this.state.validation[key]) {
            if (!(key == 'invitation' && this.props.as == 'Teacher')) {
              console.log(key);
              console.log(this.props.as);
              valid = false;
              if (this.state.validation[key] == null) {
                let validation = JSON.parse(JSON.stringify(this.state.validation));
                validation[key] = false;
                validation.msgs[key] = 'fillEmptyFields';
                await this.setState({validation: validation});
                await this.setErrorMsg();
                await this.setColor(key);
              }
            }
          }
        }
        console.log('lastCheck', valid);
        return valid;
    }

    captcha = () => {
      return this.state.captcha != null;
    }

async sign() {
  console.log('sign');
  if (!this.state.captcha) {
      await this.setError('captcha', 'pleaseValidateThroughCaptcha', false);
      await this.setErrorMsg();
     return;
  }
    if (!(await this.lastCheck())) return;
      if (!(await this.userNotExist())) {
          await this.setError('email', 'userAlreadyExists', false);
          await this.setErrorMsg();
          await this.setColor('email');
          return;
      }
      if (this.props.as == 'Student' && !(await this.invitationExists())) {
          await this.setError('invitation', 'invitationNotExist', false);
          await this.setErrorMsg();
          await this.setColor('invitation');
          return;
      }

  this.props.request('sign_up', {...this.state.params, user: this.props.as}).then((data) => {
    console.log('successful validation')
    if (data.status == 'success') {
      this.auth();
    }
    else if (data.status == 'fail'){
      this.setError('up', 'serverError', false);
      this.setErrorMsg();
    }
  });
}

 async userNotExist() { //ADD error handler
    let resp = await(this.props.request('user_exists', {email: this.state.params.email, user: this.props.as}))
    return !resp['response'];
 }

  async invitationExists() { //ADD error handler
     let resp = await(this.props.request('invitation_exists', {invitation: this.state.params.invitation}))
     return resp['response'];
  }

  render() {
    return (
      <div>
      <OptionButtons options={this.props.options} changeOption={this.changeOption} type='auth' />
      <OptionButtons options={this.state.authAsOptions} changeOption={this.props.changeOption} type='authAs' />
      <ValidatedForm
        pattern={[
            {type: 'label', text: this.props.text['email']},
            {type: 'field',
                              type: 'text',
                              paramName: 'email',
                              validate: this.validateEmail

                      },
            {type: 'label', text: this.props.text['pwd']},
            {type: 'field',
                              type: 'password',
                              paramName: 'pwd',
                              validate: this.validatePwd

                      },
            {type: 'label', text: this.props.text['pwdConfirm']},
            {type: 'field',
                              type: 'password',
                              paramName: 'pwdConfirm',
                              validate: this.validatePwdConfirm

                      },
            {type: 'label', text: this.props.text['invitationNumber'], hide: this.props.as == 'Teacher'},
            {type: 'field',
                              type: 'text',
                              paramName: 'invitation',
                              validate: this.validateInvitation,
                              hide: this.props.as == 'Teacher'
                      }
          ]}
        submit={this.sign}
        request={this.props.request}
        text={this.props.text}
        submitValue='sign_up'
        basicFieldChange={this.props.fieldChange}
        captcha={this.captcha}
        setToken={this.props.setToken}
        setStyles={this.props.setStyles}
        setCaptcha={this.setCaptcha}
        extra={this.extra}
        as={this.props.as}
      />
      </div>
  )
  }
}

export default SignUpForm;
