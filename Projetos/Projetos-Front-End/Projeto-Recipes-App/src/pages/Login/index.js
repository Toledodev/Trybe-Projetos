import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';
import image from '../../images/login-background.jpg';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    padding: '5vw',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.25)',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'center',
    backgroundBlendMode: 'darken',
  },
  login: {
    padding: 24,
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <Box
      component="div"
      className={ classes.page }
    >
      <Paper
        elevation={ 3 }
        className={ classes.login }
      >
        <Login />
      </Paper>
    </Box>
  );
}
