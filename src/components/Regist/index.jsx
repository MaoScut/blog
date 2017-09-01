import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action/async';

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }
  saveEmail() {
    this.setState({
      email: this.emailInput.value,
    });
  }
  savePassword() {
    this.setState({
      password: this.passwordInput.value,
    });
  }
  render() {
    return (
      <div>
        email:<input
          type="text"
          ref={(input) => {
            this.emailInput = input;
          }}
          onChange={this.saveEmail}
        />
        passoword:<input
          type="password"
          ref={(input) => {
            this.passwordInput = input;
          }}
          onChange={this.savePassword}
        />
        <button onClick={() => this.props.actions.registerUser({ email: this.state.email, password: this.state.password })}>regist</button>
      </div>
    );
  }
}

