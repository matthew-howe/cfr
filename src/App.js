import RPSSolverInterface from './rps';
import KuhnSolverInterface from './kuhn';
import Navbar from './components/navbar';
import React, { useState } from 'react';

import './App.css';

function App() {
  let [selected, setSelected] = useState(0);
  let solvers = [
    <RPSSolverInterface />, <KuhnSolverInterface />
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
