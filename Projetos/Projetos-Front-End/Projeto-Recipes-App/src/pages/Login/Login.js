import PropTypes from 'prop-types';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const DEFAULT_LOGIN = {
  email: '',
  password: '',
};

const useStyles = makeStyles({
  button: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
});

export default function Login() {
  const [loginData, setLoginData] = useState(DEFAULT_LOGIN);
  const [isDisabled, setIsDisabled] = useState(true);
  const { email, password } = loginData;
  const history = useHistory();
  const classes = useStyles();

  function validateEmail(userEmail) {
    const validFormat = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (userEmail.match(validFormat)) return true;
    return false;
    // Fonte da RegEx de validação de email: https://digitalfortress.tech/js/top-15-commonly-used-regex/
  }

  useEffect(() => {
    function enableBtn() {
      const MIN_PASSWORD_LENGTH = 7;
      const emailIsValid = email.length > 1 ? validateEmail(email) : false;

      if (password.length >= MIN_PASSWORD_LENGTH && emailIsValid) {
        return setIsDisabled(false);
      }
      return setIsDisabled(true);
    }

    enableBtn();
  }, [email, password]);

  function handleClick() {
    const userEmail = { email };

    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/comidas');
  }

  return (
    <form>
      <Grid
        container
        spacing={ 2 }
        alignContent="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item>
          <Typography
            variant="h3"
            gutterBottom
            direction="column"
            align="center"
            className={ classes.text }
            color="primary"
          >
            LOGIN
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="email"
            placeholder="Email"
            type="text"
            name="email"
            value={ email }
            inputProps={ {
              'data-testid': 'email-input',
            } }
            onChange={ ({ target }) => {
              setLoginData({ ...loginData, email: target.value });
            } }
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Senha"
            id="password"
            type="password"
            name="password"
            value={ password }
            inputProps={ {
              'data-testid': 'password-input',
            } }
            onChange={ ({ target }) => setLoginData(
              { ...loginData, password: target.value },
            ) }
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button
            className={ classes.button }
            variant="contained"
            color="primary"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
