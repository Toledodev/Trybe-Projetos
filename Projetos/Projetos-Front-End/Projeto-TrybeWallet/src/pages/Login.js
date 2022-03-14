import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailToStore } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, saveUserEmail } = this.props;
    const { email } = this.state;
    saveUserEmail(email);
    history.push('/carteira');
  }

  handleText({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.handleButton());
  }

  handleButton() {
    const { email, password } = this.state;
    const minCharacters = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // fonte : https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    if (emailRegex.test(email) && password.length >= minCharacters) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  }

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          email:
          <input
            data-testid="email-input"
            name="email"
            type="text"
            onChange={ this.handleText }
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            data-testid="password-input"
            name="password"
            type="password"
            onChange={ this.handleText }
          />
        </label>
        <button
          type="submit"
          disabled={ isBtnDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(emailToStore(email)),
});

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
