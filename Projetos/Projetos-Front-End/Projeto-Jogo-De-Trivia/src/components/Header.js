import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hashGerada = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hashGerada}`;
    // const getScore = JSON.parse(localStorage.getItem('state'));
    // const { score } = getScore;
    // console.log(getScore);
    return (
      <header>
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        <p>SUA VEZ</p>
        <img data-testid="header-profile-picture" src={ gravatar } alt="gravatar" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerDataReducer.player.name,
  email: state.playerDataReducer.player.email,
  score: state.playerDataReducer.score,
});

export default connect(mapStateToProps)(Header);
