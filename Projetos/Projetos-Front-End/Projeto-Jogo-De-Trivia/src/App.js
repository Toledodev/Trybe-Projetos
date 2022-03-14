import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/settings" exact component={ Settings } />
        <Route path="/trivia" exact component={ Trivia } />
        <Route path="/feedback" exact component={ Feedback } />
        <Route path="/ranking" exact component={ Ranking } />
      </Switch>
    </div>
  );
}
