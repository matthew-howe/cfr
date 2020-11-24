import RPSSolverInterface from './rps';
import KuhnSolverInterface from './kuhn';
import Navbar from './components/navbar';
import React, { useState } from 'react';
import MWKuhnSolverInterface from './mwkuhn';

import './App.css';

function App() {
  let [selected, setSelected] = useState(2);
  let solvers = [
    <RPSSolverInterface />, <KuhnSolverInterface />, <MWKuhnSolverInterface />
  ]
  let currentSolver = solvers[selected % solvers.length];


  return (
    <div className="App">
      <Navbar selected={selected} setSelected={setSelected} />
        {currentSolver}
    </div>
  );
}

export default App;
