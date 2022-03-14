import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playerScore } from '../actions';
import returnState from '../helper/helper';

const correctAnswerId = 'correct-answer';

class Trivia extends Component {
  constructor() {
    super();
    this.state = returnState();
    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.answerCountDown = this.answerCountDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.question = this.question.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.handClick = this.handClick.bind(this);
    this.trivia = this.trivia.bind(this);
    this.setGameScore = this.setGameScore.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.getDifficultyPoints = this.getDifficultyPoints.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
    this.answerCountDown();
    this.setGameScore();
    const { score } = this.state;
    const { sendoScoreToGlobalState } = this.props;
    sendoScoreToGlobalState(score);
  }

  componentDidUpdate() {
    const { totalTime } = this.state;
    const timeLimit = -1;
    if (totalTime === timeLimit) {
      this.stopCountDown();
    }
  }

  async getQuestionsFromApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await questions.json();
    this.setState({
      trivia: response,
      difficulty: response.results[0].difficulty,
    });
  }

  getDifficultyPoints() {
    const { difficulty } = this.state;
    const hardPoints = 3;
    const mediumPoints = 2;
    const easyPoints = 1;
    if (difficulty === 'hard') return hardPoints;
    if (difficulty === 'medium') return mediumPoints;
    if (difficulty === 'easy') return easyPoints;
  }

  setGameScore() {
    const { name, email } = this.props;
    const { assertions, score } = this.state;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  calculateScore(target) {
    const { totalTime } = this.state;
    const baseValue = 10;
    const difficulty = this.getDifficultyPoints();
    const score = baseValue + totalTime * difficulty;
    if (target.id === correctAnswerId) {
      const { assertions } = this.state;
      const { name, email } = this.props;
      const player = {
        name,
        assertions,
        score,
        gravatarEmail: email,
      };
      localStorage.setItem('state', JSON.stringify({ player }));
    }
    return score;
  }

  answerCountDown() {
    const oneSecondInMilliseconds = 1000;
    const oneSecond = 1;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        totalTime: prevState.totalTime - oneSecond,
      }));
    }, oneSecondInMilliseconds);
  }

  stopCountDown() {
    this.setState({ totalTime: 0, timeout: true }, () => {
      clearInterval(this.intervalId);
    });
  }

  changeColor(event) {
    const { target } = event;
    const getScore = this.calculateScore(target);
    this.setState((prevState) => ({
      highlightRightAnswer: '3px solid rgb(6, 240, 15)',
      highlightWrongAnswer:
        target.id === 'wrong-answer' ? '3px solid rgb(255, 0, 0)' : '',
      assertions:
        target.id === correctAnswerId ? prevState.assertions + 1
          : prevState.assertions,
      score:
        target.id === correctAnswerId
          ? prevState.score + getScore
          : prevState.score,
    }));
    this.setState({
      highlightWrongAnswer: '3px solid rgb(255, 0, 0)',
      showNextButton: true,
    });
  }

  trivia() {
    const { trivia, indexQuestion, timeout, highlightWrongAnswer } = this.state;
    return trivia.results[indexQuestion].incorrect_answers.map(
      (answer, index) => (
        <li key={ index }>
          <button
            type="button"
            disabled={ timeout }
            data-testid={ `wrong-answer-${index}` }
            id="wrong-answer"
            style={ { border: highlightWrongAnswer } }
            onClick={ this.changeColor }
          >
            {answer}
          </button>
        </li>
      ),
    );
  }

  handClick() {
    const { history } = this.props;
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      highlightRightAnswer: '',
      highlightWrongAnswer: '',
      totalTime: 30,
      timeout: false,
    }));
    this.setGameScore();
    const { score } = this.state;
    const { sendoScoreToGlobalState } = this.props;
    sendoScoreToGlobalState(score);
    const { indexQuestion } = this.state;
    const lastQuestionIndex = 4;
    if (indexQuestion === lastQuestionIndex) {
      history.push('/feedback');
    }
  }

  nextButton() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.handClick }>
        Próxima
      </button>
    );
  }

  question() {
    const { trivia, highlightRightAnswer,
      timeout, totalTime, indexQuestion } = this.state;
    return (
      <>
        <Header />
        <div>
          {!trivia.results ? (
            <span>Loading</span>
          ) : (
            <div>
              <h1 data-testid="question-category">
                {trivia.results[0].category}
              </h1>
              <h2 data-testid="question-text">
                {trivia.results[indexQuestion].question}
              </h2>
              <h4>{totalTime}</h4>
              <ol>
                {this.trivia()}
                <li>
                  <button
                    type="button"
                    disabled={ timeout }
                    data-testid="correct-answer"
                    id="correct-answer"
                    style={ { border: highlightRightAnswer } }
                    onClick={ this.changeColor }
                  >
                    {trivia.results[indexQuestion].correct_answer}
                  </button>
                </li>
              </ol>
            </div>
          )}
        </div>
      </>
    );
  }

  render() {
    const { showNextButton } = this.state;
    return (
      <div>
        {this.question()}
        {showNextButton && this.nextButton()}
      </div>
    );
  }
}

Trivia.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  sendoScoreToGlobalState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerDataReducer.player.name,
  email: state.playerDataReducer.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  sendoScoreToGlobalState: (payload) => dispatch(playerScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
