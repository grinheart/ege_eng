import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import OptionButtons from './option_buttons';

const API = 'http://localhost:3001/';

class ValidatedForm extends React.Component {
  constructor(props) {
      super(props);

      this.styles = {
        pendingFieldColor: '#fff',
        errFieldColor: '#fa2363',
        validFieldColor: '#9f9'
      }


      this.defaultState = {
        params: this.defaultValues(this.params()),
        msgForUser: '',
        styles: this.defaultStyles(this.params()),
        validation: this.defaultStatus(this.params()),
        captcha: null,
        validate: this.validate(),
        files: {}
   }

      this.basicFieldChange = this.props.basicFieldChange.bind(this);
      this.setToken = this.props.setToken;
      this.setStyles = this.props.setStyles.bind(this);
      this.state = JSON.parse(JSON.stringify(this.defaultState));
      this.state.validate = this.defaultState.validate;
      this.submit = this.props.submit.bind(this);

      for (let key in this.props.extra) {
        this[key] = this.props.extra[key];
        if (typeof(this[key]) == 'function') {
          this[key] = this[key].bind(this);
        }
      }
  }
  //constructor


  defaultValues = (params) => {
    let res = {};
    for (let key = 0; key < params.length; key++) {
      res[params[key]] = '';
    }
    return res;
  }

  defaultStyles = (params) => {
    console.log('defaultStyles', params);
    let res = {};
    for (let key = 0; key < params.length; key++) {
      res[params[key]] = {backgroundColor: this.styles.pendingFieldColor};
    }
    return res;
  }

  defaultStatus = (params) => {
    let res = {};
    for (let key = 0; key < params.length; key++) {
      res[params[key]] = null;
    }
    res.msgs = this.defaultValues(params.concat(['captcha']));
    return res;
  }

        validateFocusOut = async (name) => {
          console.log(this.state.validate);
          console.log(name);
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


  //setting validation messages
  setError = async (name, msg, status) => {
      let validation = JSON.parse(JSON.stringify(this.state.validation));
      if (name in validation) {
        validation[name] = status;
      }
      validation.msgs[name] = msg;
      await this.setState({validation: validation});
  }

  setColor = async (name, isFieldChange = false) => {
      let styles = JSON.parse(JSON.stringify(this.state.styles));
      if (this.state.validation[name] == null) {
        styles[name].backgroundColor = this.styles.pendingFieldColor;
      }
      else if (this.state.validation[name]) {
        styles[name].backgroundColor = this.styles.validFieldColor;
      }
      else {
        if (isFieldChange) {
          styles[name].backgroundColor = this.styles.pendingFieldColor;
        }
        else {
          styles[name].backgroundColor = this.styles.errFieldColor;
        }
      }
      await this.setStyles(name, styles[name]);
  }

  setErrorMsg = (name = null, isFieldChange = false) => {
    console.log('setting error');
      let msgs = JSON.parse(JSON.stringify(this.state.validation.msgs));
      console.log(msgs);
      if (isFieldChange) {
        delete msgs[name];
      }
      if (name) {
        if (this.state.validation[name]) delete msgs[name];
      }
      msgs = [...new Set(Object.values(msgs))];
      let error = msgs.map(msg => this.props.text[msg]).join(' ');

      this.setState({msgForUser: error});
  }

   setCaptcha = async (v) => {
    await this.setState({captcha: v});
    if (this.state.captcha != null) {
      await this.setError('captcha', '', true);
    }
  }

    captcha = () => {
      return (<ReCAPTCHA sitekey="6LfnNMcUAAAAAGUFgr5bsSbY2Q4kaTisElyICkVZ" onChange={this.setCaptcha} />);
    }


//events
  focusOut = (e) => {
    this.validateFocusOut(e.target.name);
  }

  fieldChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.basicFieldChange(e).then(() => {
          this.validateChangedField(name, value);
        }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) == JSON.stringify(this.state)) {
      if (prevProps.text.lang != this.props.text.lang) {
        this.setErrorMsg();
      }
      else if (prevProps.type != this.props.type) {
        this.setState(this.defaultState);
      }
    }
  }

  params = () => {
      let p = this.props.pattern
               .filter(el => el['type'] != 'label')
               .map(el => el['paramName'])
      return p;
  }

  validate = () => {
    let v = this.props.pattern
            .filter(el => el['type'] != 'label');

    let map = {}
    for (let i = 0; i < v.length; i++) {
      map[v[i]['paramName']] = v[i]['validate'];
    }

    for (let key in map) {
        map[key] = map[key].bind(this);
    };
    return map;
  }

  fileChanged = async (e) => {
      let files = this.state.files;
      files[e.target.name] = e.target.files[0];
      await this.setState({files: files});
      console.log('this.state.files', this.state.files);
  }

  field = (fieldData) => {
    let type = fieldData['type'];
    let accept = fieldData['accept'];
    let p = fieldData['paramName'];

    if (type == 'textarea') {
      return(<textarea style={this.state.styles[p]} value={this.state.params[p]} onChange={this.fieldChange} onBlur={this.focusOut} name={p}></textarea>);
    }
    else if (type != 'file') {
       return(<input type={type} accept={accept} style={this.state.styles[p]} value={this.state.params[p]} onChange={this.fieldChange} onBlur={this.focusOut} name={p} />);
    }
    else {
      return(<input type={type} accept={accept} style={this.state.styles[p]} onChange={this.fileChanged} onBlur={this.focusOut} name={p} />);
    }
  }

  form = () => {
       return(this.props.pattern
              .filter(el => !el['hide'])
              .map((el, i) => {
               if (el.type == 'label') {
                 return(<div key={i}>{el.text}</div>);
               }
               else {
                 return(<div key={i}>{this.field(el)}</div>);
               }
             })
           );
  }

  render() {
    return (
      <div>
        {this.form()}
        {this.props.captchaDisabled ? null : this.captcha()}
        <input type='submit' value={this.props.text[this.props.submitValue]} onClick={this.submit}/>
        <div>{this.state.msgForUser}</div>
      </div>
  )
  }
}

export default ValidatedForm;
