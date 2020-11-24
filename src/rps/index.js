import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateRegrets } from './store';
import VillainStratForm from './components/villStratForm';
import RegretVisualizer from './components/regretVisualizer';
import RPSSolver from './RPSSolverSelfTrain';

import './rps.css';


function RPSSolverInterface({ updateRegrets }) {
  let [villStrat, setVillStrat] = useState([.3333333, .3333333, .333333])
  let [iterations, setIterations] = useState(1000);
  let [shouldRun, setShouldRun] = useState(false);
  let [monkey, rerender] = useState(false);
  
  let regretMap = {};
  const setRegretSum = regrets => {
    updateRegrets(regrets);
  }
  let avgStrat = [0,0,0]

  if (shouldRun) {
    let solver = new RPSSolver(villStrat, setRegretSum);
    solver.train(iterations);
    avgStrat = solver.getAvgStrategy();
  }

  const handleChange = evt => {
    setIterations(evt.target.value);
  }

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
      <VillainStratForm strat={avgStrat} setStrat={setVillStrat} />
        </div>
      <RegretVisualizer regrets={regretMap} />
    </div>
  )
}

export default connect(null, { updateRegrets })(RPSSolverInterface)
