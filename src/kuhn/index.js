import React, { useState } from 'react';
import { connect } from 'react-redux';

import KuhnSolver from './KuhnSolver';

import './kuhn.css';

function KuhnSolverInterface() {

  let [iterations, setIterations] = useState(1000);

  let solver = new KuhnSolver();
  solver.train(10000)
  for (let key in solver.infoSetMap) {
    console.log(`${key}          ${solver.infoSetMap[key].getAvgStrategy()}`);
  }

  const handleChange = evt => {
    setIterations(evt.target.value);
  }


  let [shouldRun, setShouldRun] = useState(false);
  let [monkey, rerender] = useState(false);


  const runSolver = () => {
    if (shouldRun === false) {
      setShouldRun(true);
    } else {
      rerender(!monkey); 
    }
  }

  return (
    <div>
      <div className="controls">
        <button id="rps-run-btn" onClick={() => runSolver()}>
          RUN
          </button>
        <div id="rps-iterations">
          <div>ITERATIONS</div>
      <form >
        <label>
          <input
            type="text"
            id=""
            value={iterations}
            onChange={handleChange}
          />
        </label>
      </form>
          </div>
        </div>
      </div>
  )
}

export default KuhnSolverInterface;
