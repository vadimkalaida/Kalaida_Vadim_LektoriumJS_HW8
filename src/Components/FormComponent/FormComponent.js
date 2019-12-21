import React, {Component} from 'react'
import ReactDOM from "react-dom"
import validator from 'validator'
import passwordValidator from 'password-validator'
import './FormComponent.scss'
import {UserNameInput} from './UserNameInputComponent/UserNameComponent'

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            phone: '',
            phoneError: '',
            password: '',
            passwordConfirm: '',
            passwordError: '',
            passwordConfirmError: '',
            blockClass: 'ErrorBlockNo'
        };
        this.userNamee = React.createRef()
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.informationArray = [];
    }


    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
        if (validator.isEmail(this.state.email)) {
            this.setState({
                emailError: '',
                blockClass: 'ErrorBlockNo'
            })
        } else {
            this.setState({
                emailError: 'Email should looks like "example1@gmail.com"',
                blockClass: 'ErrorBlock'
            })
        }
    }

    onChangePhone(event) {
        this.setState({
            phone: event.target.value
        });
        if (validator.isMobilePhone(this.state.phone)) {
            this.setState({
                phoneError: '',
                blockClass: 'ErrorBlockNo'
            });
        } else {
            this.setState({
                phoneError: 'Phone NUMBER should looks like "+380112881884" without plus',
                blockClass: 'ErrorBlock'
            });
        }
    }

    onChangePassword(event) {
        let passValOptions = new passwordValidator();
        passValOptions.is().min(8);
        passValOptions.is().max(18);
        passValOptions.has().uppercase();
        passValOptions.has().lowercase();
        passValOptions.has().not().spaces();
        this.setState({
            password: event.target.value
        });
        if (passValOptions.validate(this.state.password)) {
            this.setState({
                passwordError: '',
                blockClass: 'ErrorBlockNo'
            })
        } else {
            this.setState({
                passwordError: 'Password length should be 8 - 18, has uppercase and lowercase letters and does not have spaces',
                blockClass: 'ErrorBlock'
            })
        }
    }

    onChangePasswordConfirm(event) {
        this.setState({
            passwordConfirm: event.target.value
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
        } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
                emailError: 'This input should look like "something1@gmail.com" ',
                blockClass: 'ErrorBlock'
            });
        } else {
            this.setState({
                emailError: '',
                blockClass: 'ErrorBlockNo'
            })
        }
        if (this.state.password === '') {
            this.setState({
                passwordError: 'Password should be on ENGLISH and not empty',
                blockClass: 'ErrorBlock'
            })
        } else {
            this.setState({
                passwordError: '',
                blockClass: 'ErrorBlockNo'
            })
        }
        if (this.state.blockClass === 'ErrorBlockNo') {
            const node = ReactDOM.findDOMNode(this);
            this.informationArray.push({
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            });
            this.setState({
                username: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: ''
            });
            node.querySelector('#username').value = '';
            node.querySelector('#email').value = '';
            node.querySelector('#phone').value = '';
            node.querySelector('#password').value = '';
            // node.querySelector('#passwordConfirm').value = '';
            localStorage.setItem('user', JSON.stringify(this.informationArray));
            console.log(this.informationArray);
        }
    }

    handleSubmit =(event) => {
        event.preventDefault()

        console.log('this.userNameev', this.userNamee);
        console.log('event', event);
    }


    render() {
        const {usernameError, emailError, phoneError, passwordError, passwordConfirmError} = this.state;
        return (
            <div className={'Content'}>
                <form onSubmit={this.handleSubmit}>
                    <UserNameInput ref={this.userNamee} usernameError={usernameError}/>
                    <input value={this.state.email} type="text" name="email" id="email"
                           placeholder={'*Email'}
                           className={'Content-input'} onChange={this.onChangeEmail}/>
                    {emailError !== '' && <span>{emailError}</span>}
                    <input type="text" name="phone" id="phone" placeholder={'Phone Number'}
                           className={'Content-input'} onChange={this.onChangePhone}/>
                    {phoneError !== '' && <span>{phoneError}</span>}
                    <input type="password" name="password" id="password" placeholder={'*Password'}
                           className={'Content-input'} onChange={this.onChangePassword}/>
                    {passwordError !== '' && <span>{passwordError}</span>}
                    {/*<input type="password" name="passwordConfirm" id="passwordConfirm" pattern="[A-Za-z]"*/}
                           {/*placeholder={'*Confirm Password'} onChange={this.onChangePasswordConfirm}*/}
                           {/*className={'Content-input'}/>*/}
                    {/*{passwordConfirmError !== '' && <span>{passwordConfirmError}</span>}*/}
                    <div className={this.state.blockClass}></div>
                    <button id="submitBtn" className={'Content-btn'} >Signup</button>
                </form>
            </div>
        );
    }
}