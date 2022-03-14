export default function returnState() {
  return {
    trivia: [],
    highlightRightAnswer: '',
    highlightWrongAnswer: '',
    showNextButton: false,
    indexQuestion: 0,
    totalTime: 30,
    timeout: false,
    assertions: 0,
    score: 0,
    difficulty: '',
  };
}
