import React, { Component } from 'react';
import axios from 'axios';
import './login.scss';
import validateInput from '../../utils/validation';
import LocalState from '../../utils/localState';

class Login extends Component {
  state = {
    fullname: '',
    username: '',
    password: '',
    error: '',
    displayLoginForm: true, 
  };

  handleInputChange = () => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    });
  }

  sendData = async (type) => {
    const { username, password, fullname } = this.state; 
    const uri = type === 'signup' ? '/api/v1/register' : '/api/v1/login';
    const params = type === 'login'
      ? { username, password }
      : { username, password, fullname}
    const response = await axios.post(uri, params);
    return response.data;
  }

  handleSubmit = (type) => () => {
    const notValid= validateInput(type, this.state);

    if (notValid) {
      return this.setState({ error: notValid })
    }

    this.sendData(type)
      .then((res) => {
        LocalState.setToken(res.data);
        return this.props.history.push('/dashboard');
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  toggleForm = () => this.setState({ displayLoginForm: !this.state.displayLoginForm });

  renderSignUpForm = () => (
    <div className="signup-container">
      <div className="error-container">{this.state.error}</div>
      <div className="signup-input">
        <label>Fullname</label>
        <input name="fullname" type="text" className="signup-input__field" onChange={this.handleInputChange} />
      </div>
      <div className="signup-input">
        <label>Username</label>
        <input name="username" type="text" className="signup-input__field" onChange={this.handleInputChange} />
      </div>
      <div className="signup-input">
        <label>Password</label>
        <input name="password" type="text" className="signup-input__field" onChange={this.handleInputChange} />
      </div>
      <div className="signup-input">
        <label>Confirm Password</label>
        <input name="confirm-pass" type="text" className="signup-input__field" onChange={this.handleInputChange} />
      </div>
      <div>
      <button className="signup-button" onClick={this.handleSubmit('signup')}>Proceed</button>
      </div>
      <span onClick={this.toggleForm}>Already signed up?, Log In!</span>
    </div>
  );

  renderLoginForm = () => (
    <div className="login-container">
      <div className="error-container">{this.state.error}</div>
      <div className="login-input">
        <label>Username</label>
        <input name="username" type="text" className="login-input__field" onChange={this.handleInputChange} />
      </div>
      <div className="login-input">
        <label>Password</label>
        <input name="password" type="text" className="login-input__field" onChange={this.handleInputChange} />
      </div>
      <div>
      <button className="login-button" onClick={this.handleSubmit('login')}>Log In</button>
      </div>
      <span onClick={this.toggleForm}>Are you a new user?, SignUp!</span>
    </div>
  )

  render() {
    return (
      this.state.displayLoginForm
        ? this.renderLoginForm()
        : this.renderSignUpForm()
    )
  }
}

export default Login;