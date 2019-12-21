import React, {Component} from 'react'

export class UserNameInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }


    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        return (
            <>
                <input type="text"
                       name="username"
                       id="username"
                       value={this.state.username}
                       placeholder={'*Username'}
                       className={'Content-input'}
                       onChange={this.onChangeUsername}/>
                {
                    this.props.usernameError !== '' && <span>{this.props.usernameError}</span>
                }
            </>
        )

    }
}