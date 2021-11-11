import React from "react";

const oneSecond = 1000;
const timeLimit = 6;
class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
          seconds: 0,
          phases:['Inspire...', 'Segure...', 'Expire... '],
          currentPhase: 0,
        };
      }

      componentDidMount() {
         this.intervalId = setInterval(() => {
              this.setState((prevState) => ({
                  seconds: prevState.seconds + 1
              }))
          }, oneSecond);
      }

      componentDidUpdate(prevState) {
          if (prevState.seconds === timeLimit) {
              this.setState({
                  seconds: 0,
                  currentPhase: (prevState.currentPhase === 2) ? 0 : prevState.currentPhase + 1,
              });
          }
      }

      componentWillUnmount() {
          clearInterval(this.intervalId); 
      }
    render() {
        const { seconds, phases, currentPhase } = this.state;
        return (
            <section>
          <h1>{phases[currentPhase]}</h1> 
          <h2>{seconds}</h2>
        </section>
        );
    }
}

export default Timer;