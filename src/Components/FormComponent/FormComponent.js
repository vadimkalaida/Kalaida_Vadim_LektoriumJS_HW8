import React, {Component} from 'react';
import './FormComponent.scss'

export default class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      usernameError : '',
      email : '',
      emailError : '',
      phone : '',
      phoneError : '',
      password : '',
      passwordConfirm : '',
      passwordError : '',
      passwordConfirmError : '',
      blockClass : 'ErrorBlockNo'
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    let val = event.target.value.replace(/[^\x00-\x7F]/ig, '');
    this.setState({
      username : val
    });
    if (this.state.username.length < 4 || this.state.username.length > 16) {
      this.setState({
        usernameError: 'Username length should be 4 - 16 and only ENGLISH',
        blockClass : 'ErrorBlock'
      })
    } else {
      this.setState({
        usernameError: '',
        blockClass : 'ErrorBlockNo'
      })
    }
  }

  onChangeEmail(event) {
    this.setState({
      email : event.target.value
    });
    if(this.state.email.length < 4) {
      this.setState({
        emailError: 'Email length should be more than 4',
        blockClass : 'ErrorBlock'
      })
    } else {
      this.setState({
        emailError: '',
        blockClass : ''
      })
    }
  }

  onChangePhone(event) {
    this.setState({
      phone : event.target.value
    });
    if(isNaN(parseInt(this.state.phone))) {
      this.setState({
        phoneError: 'Phone NUMBER not string',
        blockClass : 'ErrorBlock'
      });
    } else if(this.state.phone.length !== 12) {
      this.setState({
        phoneError: 'Phone number length is 12',
        blockClass : 'ErrorBlock'
      });
    }
    else {
      this.setState({
        phoneError: '',
        blockClass : 'ErrorBlockNo'
      });
    }
  }

  onChangePassword(event) {
    this.setState({
      password : event.target.value
    });
    if (this.state.password.length < 6 || this.state.password.length > 18) {
      this.setState({
        passwordError: 'Password length should be 6 - 18 and only ENGLISH',
        blockClass : 'ErrorBlock'
      })
    } else {
      this.setState({
        passwordError: '',
        blockClass : 'ErrorBlockNo'
      })
    }
  }

  onChangePasswordConfirm(event) {
    this.setState({
      passwordConfirm : event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.username === '') {
      this.setState({
        usernameError: 'Username should be on ENGLISH and not empty'
      })
    } else {
      this.setState({
        usernameError: ''
      })
    }
    if (this.state.email === '') {
      this.setState({
        emailError: 'Email should be on ENGLISH and not empty'
      })
    } else {
      this.setState({
        emailError: ''
      })
    }
    if (this.state.password === '') {
      this.setState({
        passwordError: 'Password should be on ENGLISH and not empty'
      })
    } else {
      this.setState({
        passwordError: ''
      })
    }
    if (this.state.passwordConfirm === '') {
      this.setState({
        passwordConfirmError: 'Please confirm your password'
      })
    } else if(this.state.passwordConfirm !== this.state.password) {
      this.setState({
        passwordConfirmError : 'Passwords should be identical'
      });
    } else {
      this.setState({
        passwordConfirmError: ''
      })
    }
  }


  render() {
    const { usernameError, emailError, phoneError, passwordError, passwordConfirmError} = this.state;
    return(
      <div className={'Content'}>
        <form>
          <input type="text" name="username" id="username" pattern = "[A-Za-z]" placeholder={'Username'} className={'Content-input'} onChange={this.onChangeUsername} />
          { usernameError !== '' && <span>{usernameError}</span> }
          <input type="text" name="email" id="email" pattern = "[A-Za-z]" placeholder={'Email'} className={'Content-input'} onChange={this.onChangeEmail} />
          { emailError !== '' && <span>{emailError}</span> }
          <input type="text" name="phone" id="phone" pattern = "[A-Za-z]" placeholder={'Phone Number'} className={'Content-input'} onChange={this.onChangePhone} />
          { phoneError !== '' && <span>{phoneError}</span> }
          <input type="password" name="password" id="password" pattern = "[A-Za-z]" placeholder={'Password'} className={'Content-input'} onChange={this.onChangePassword} />
          { passwordError !== '' && <span>{passwordError}</span> }
          <input type="password" name="passwordConfirm" id="passwordConfirm" pattern = "[A-Za-z]" placeholder={'Confirm Password'} onChange={this.onChangePasswordConfirm} className={'Content-input'} />
          { passwordConfirmError !== '' && <span>{passwordConfirmError}</span> }
          <div className={this.state.blockClass}></div>
          <button id="submitBtn" className={'Content-btn'} onClick={this.onSubmit}>Signup</button>
        </form>
      </div>
    );
  }
}