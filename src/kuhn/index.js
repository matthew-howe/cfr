import React, { useState } from 'react';
import { connect } from 'react-redux';

import KuhnSolver from './KuhnSolver';

import './kuhn.css';

function KuhnSolverInterface() {

  let [iterations, setIterations] = useState(1000);


  let sorteddivs = [];
  let solver = new KuhnSolver();
  solver.train(iterations)
  let results = [];
  for (let key in solver.infoSetMap) {
    let b = solver.infoSetMap[key].getAvgStrategy()[0].toFixed(2)
    let c = solver.infoSetMap[key].getAvgStrategy()[1].toFixed(2)

    
    results.push(
      {
        html: (
      <div>
        {key} &emsp;&emsp;&emsp;           {b} &emsp;&emsp;&emsp;   {c} 
      </div>
        ),
        card: key}
    )
  }

  results = results.sort((a, b) => {
    if (a.card.length < b.card.length) return -1
    else if (b.card.length < a.card.length) return 1


    else if (a.card < b.card) return -1
    else if (b.card < a.card) return 1
    else return 0;
  })


  for (let i = 0; i < results.length; i++) sorteddivs.push(results[i].html);

  sorteddivs.unshift(<div>CARDS &emsp; BET/CALL &emsp; CHECK/FOLD</div>)
  sorteddivs.unshift(<h4> FIRST ACTION</h4>)
  sorteddivs.splice(5,0, <h4> SECOND ACTION </h4>)
  sorteddivs.splice(6,0, <div>CARDS &emsp; BET/CALL &emsp; CHECK/FOLD</div>)

          
  sorteddivs.splice(13,0, <h4> THIRD ACTION </h4>)
  sorteddivs.splice(14,0, <div>CARDS &emsp; BET/CALL &emsp; CHECK/FOLD</div>)



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
        <div>
          {sorteddivs}
        </div>
      </div>
  )
}

export default KuhnSolverInterface;
