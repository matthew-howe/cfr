import React, { useState } from 'react';
import MWKuhnSolver from './MWKuhnSolver';
import './mwkuhn.css';

function MWKuhnSolverInterface() {
  let [iterations, setIterations] = useState(1000);
  let solver = new MWKuhnSolver();

  return (
    <div>
    {solver.hello.repeat((iterations / 1000) * 3)}
    </div>
  )
}

export default MWKuhnSolverInterface;
