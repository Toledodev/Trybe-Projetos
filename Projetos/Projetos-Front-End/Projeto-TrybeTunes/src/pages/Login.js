import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      isLoginBtnDisabled: true,
      isLoading: false,
      isRedirect: false,
    };
  }

  componentDidUpdate(prevState) {
    const { login } = this.state;
    if (prevState.login !== login) {
      this.checkLoginInput();
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(login) {
    this.setState({
      isLoading: true,
    });

    await createUser({ name: login });
    this.setState({
      isRedirect: true,
    });
  }

  checkLoginInput = () => {
    const { login } = this.state;
    const minimumCharacters = 3;
    this.setState({
      isLoginBtnDisabled: (login.length < minimumCharacters),
    });
  }

  render() {
    const { login, isLoginBtnDisabled, isLoading, isRedirect } = this.state;
    const { handleInputChange } = this;

    if (isLoading) {
      return (
        <div>
          <Loading />
          { isRedirect && <Redirect to="/search" /> }
        </div>
      );
    }

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            Nome:
            <input
              name="login"
              type="text"
              data-testid="login-name-input"
              value={ login }
              onChange={ handleInputChange }
            />
          </label>
          <button
            type="submit"
            name="loginSubmitButton"
            data-testid="login-submit-button"
            disabled={ isLoginBtnDisabled }
            onClick={ () => this.handleSubmit(login) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
