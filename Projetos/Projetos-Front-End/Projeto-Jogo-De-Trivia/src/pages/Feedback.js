import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const dataLocalStorage = JSON.parse(localStorage.getItem('state'));
    const playerAssertions = dataLocalStorage.player.assertions;
    const playerScore = dataLocalStorage.player.score;
    const parameter = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {playerAssertions < parameter ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <h3 data-testid="feedback-total-score">{playerScore}</h3>
        <h3 data-testid="feedback-total-question">{playerAssertions}</h3>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.playerDataReducer.score,
});

export default connect(mapStateToProps)(Feedback);
