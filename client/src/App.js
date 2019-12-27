import React from 'react';

import OptionButtons from './option_buttons';
import Workspace from './workspace';
import SignUpForm from './signup_form';
import SignInForm from './signin_form';

const API = 'http://localhost:3001/';

const EN_DICTIONARY = {
  email: 'Email',
  pwd: 'Password',
  pwdConfirm: 'Password confirmation',
  sign_up: 'Sign up',
  sign_in: 'Sign in',
  signOut: 'Sign out',
  userAlreadyExists: 'A user with this email already exists.',
  emailFormatErr: 'This is not a correct email address.',
  pwdFormatErr: 'The password is too short. It should be at least 7 characters long.',
  pwdConfirmNotMatch: 'Passwords don\'t match.',
  fillEmptyFields: 'Please fill the empty fields.',
  pleaseValidateThroughCaptcha: 'Please validate through captcha.',
  incorrectCredentials: 'Wrong password, or there\'s no such user',
  invitationNumber: 'Invitation number',
  invalidInvitation: 'Invalid invitation number.',
  invitationNotExist: 'There\'s no such invitation.',
  serverError: 'Server error. Please try again.',
  sendTask: 'Send task',
  explanationAbsence: 'The explanation of the task is absent.',
  questionAbsence: 'The questions for the task are absent.',
  not5questions: 'There must be 5 questions. Make sure you\'ve divided them with a single line break.',
  promo: 'Promo',
  image: 'Image',
  createInvitation: 'Create an invitation',
  startSeries: 'Start a series',
  answerRecorded: 'Your answer has been recorded',
  startAgain: 'Start again',
  readOutLoud: 'Please read the text out loud',
  ready: 'I\'m ready',
  micCheck: 'Microphone check',
  start: 'Start',
  replay: 'Replay',
  finish: 'Finish',
  recordNotAllowed: 'Recording audio hasn\'t been allowed',
  nextQuestion: 'Next question',
  lang: 'English'
};

const RU_DICTIONARY = {
  email: 'Email',
  pwd: 'Пароль',
  pwdConfirm: 'Подтверждение пароля',
  sign_up: 'Зарегистрироваться',
  sign_in: 'Войти',
  signOut: 'Выйти',
  userAlreadyExists: 'Пользователь с таким логином уже существует.',
  emailFormatErr: 'Пожалуйста, проверьте email.',
  pwdFormatErr: 'Пароль слишком короткий. В нём должно быть не менее 7 символов.',
  pwdConfirmNotMatch: 'Пароли не совпадают.',
  fillEmptyFields: 'Пожалуйста, заполните пустые поля.',
  pleaseValidateThroughCaptcha: 'Пожалуйста, пройдите капчу.',
  incorrectCredentials: 'Неверный логин или пароль',
  invitationNumber: 'Номер приглашения',
  invalidInvitation: 'Неверный номер приглашения.',
  invitationNotExist: 'Приглашение не найдено.',
  serverError: 'Ошибка сервера. Пожалуйста, попробуйте ещё раз.',
  sendTask: 'Отправить задание',
  explanationAbsence: 'Объяснение задания отсутствует.',
  questionAbsence: 'Вопросы к заданию отсутствуют.',
  not5questions: 'Вопросов должно быть 5. Убедитесь, что они разделены одним переносом строки.',
  promo: 'Промо',
  image: 'Изображение',
  createInvitation: 'Создать приглашение',
  startSeries: 'Начать тренировку',
  answerRecorded: 'Ответ записан',
  startAgain: 'Начать снова',
  readOutLoud: 'Пожалуйста, прочитайте текст вслух',
  ready: 'Я готов(а)',
  micCheck: 'Проверка микрофона',
  start: 'Start',
  replay: 'Проиграть аудио',
  finish: 'Закончить',
  recordNotAllowed: 'Вы запретили записывать аудио',
  nextQuestion: 'Следующий вопрос',
  lang: 'Русский'
};


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      langs: {
        en: EN_DICTIONARY,
        ru: RU_DICTIONARY
      },
      authOptions: ['in', 'up'],
      curSettings: {
        lang: 'en',
        auth: 'in',
        authAs: 'Student'
      },
      token: null
  }

  this.isAuth();
 }

  request = async (url, params = {}) => {
    let data = new FormData();
    for (let key in params) {
      data.append(key, params[key]);
    }

    let resp = await fetch(API + url, { //ADD error handler
        method: 'post',
        body: data,
        credentials: 'include'
    });

    return await resp.json();
  }

  fieldChange(e) {
    return new Promise((resolve, reject) => {
      let params = this.state.params;
      params[e.target.name] = e.target.value;
      this.setState({params: params});
      resolve();
    });
  }

  async setStyles(name, styles) {
        let stateUpdate = {
          styles: this.state.styles
        };
        stateUpdate.styles[name] = styles;
        await this.setState(stateUpdate);
  }

  isAuth = async () => { //ADD error handler
     let resp = await this.request('token');
     await this.setState({token: resp['token']});
     console.log('token', this.state.token);
  }

  signout = () => {
    this.request('sign_out');
    this.setState({token: ''});
  }


  changeOption = async (type, option) => {
      let settings = this.state.curSettings;
      settings[type] = option;
      console.log(this.state.curSettings);
      await this.setState(settings);
      console.log(this.state.curSettings);
  }

  switchComponent = (status, statusCollection, handlerCollection, args = [], defaultHandler = false) => {
      for (let key = 0; key < statusCollection.length; key++)   {
        if (statusCollection[key] == status) {
          return handlerCollection[key](...args);
        }
      }
      if (defaultHandler)
        return defaultHandler(...args);
  }

  showLoading = () => {
      return(<div>Loading...</div>);
  }

  showSignForm = () => {
    if (this.state.curSettings.auth == 'up') {
      return(<SignUpForm
            text={this.state.langs[this.state.curSettings.lang]}
            request={this.request}
            fieldChange={this.fieldChange}
            as={this.state.curSettings.authAs}
            setStyles={this.setStyles}
            options={this.state.authOptions}
            changeOption={this.changeOption}
            auth={this.isAuth}/>);
    }
    else {
      return(<SignInForm
            text={this.state.langs[this.state.curSettings.lang]}
            request={this.request}
            fieldChange={this.fieldChange}
            as={this.state.curSettings.authAs}
            setStyles={this.setStyles}
            options={this.state.authOptions}
            changeOption={this.changeOption}
            auth={this.isAuth}/>);
    }
  }

  showWorkspace = () => {
    return(<Workspace
    request={this.request}
    switchComponent={this.switchComponent}
    loading={this.showLoading}
    fieldChange={this.fieldChange}
    text={this.state.langs[this.state.curSettings.lang]}
    setStyles={this.setStyles}
    loading={this.showLoading}
    />);
  }

  render () {
    return (<div>
      <OptionButtons options={Object.keys(this.state.langs)} changeOption={this.changeOption} type='lang' />
       {this.switchComponent(this.state.token, [null, false, true], [this.showLoading, this.showSignForm, this.showWorkspace])}
      <hr />
      {this.state.token? <button onClick={this.signout}>{this.state.langs[this.state.curSettings.lang]['signOut']}</button> : null}
      </div>)
  }
}

export default App;
