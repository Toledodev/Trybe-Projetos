import React from 'react';
import './App.css';
import PlanetsProvider from './Components/PlanetsProvider';
import Table from './Components/Table';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
