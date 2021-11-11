import React from 'react';
import './App.css';
import Timer from './components/Timer';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showTimer: true,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  //da pra fazer assim mas eu prefiro o ternary operator
  // timerElement() {
  //   const {showTimer} = this.state;
  //   if({showTimer}){
  //   return <Timer />;
  //   } 
  //   return null;
  // }
 toggleTimer () {
   this.setState((prevState) => (
     {
       showTimer: !prevState.showTimer,
     }));
 }

  render() {
    const { showTimer } = this.state;
    return (
      <div>
        <header>
          
        </header>
        {/* {this.timerElement()} */}
        {showTimer ? <Timer /> : null}
        <button onClick={ this.toggleTimer } type='button'>{ showTimer ? 'ESCONDER TIMER' : 'MOSTRAR TIMER'}</button>
      </div>
    );
  }
}

export default App;