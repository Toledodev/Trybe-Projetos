import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Search from './Search';

const useStyles = makeStyles({
  'page-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100vw',
    padding: '4px',
  },
  icons: {
    padding: '8px',
  },
});

export default function Header({ title, displaySearch = true }) {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);
  const classes = useStyles();

  return (
    <Paper elevation={ 8 }>
      <Grid container>
        <Grid item>
          <Box
            component="header"
            className={ classes['page-header'] }
            sx={ { bgcolor: 'primary.main',
              color: 'text.primary',
            } }
          >
            <input
              data-testid="profile-top-btn"
              type="image"
              alt="profile top button"
              onClick={ () => history.push('/perfil') }
              src={ profileIcon }
              className={ classes.icons }
            />
            <Typography
              variant="h3"
              data-testid="page-title"
            >
              {title}
            </Typography>
            {displaySearch
          && <input
            data-testid="search-top-btn"
            type="image"
            alt="search top button"
            onClick={ () => setShowButton(!showButton) }
            src={ searchIcon }
            className={ classes.icons }
          />}
          </Box>
        </Grid>
        <Grid item>
          {showButton
        && <Search />}
        </Grid>
      </Grid>
    </Paper>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  displaySearch: PropTypes.bool.isRequired,
};
