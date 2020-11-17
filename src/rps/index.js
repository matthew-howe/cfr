import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateRegrets } from './store';
import VillainStratForm from './components/villStratForm';
import RegretVisualizer from './components/regretVisualizer';
import RPSSolver from './RPSSolverSelfTrain';

let _go = true;
let _regrets = [0, 0, 0]

function RPSSolverInterface({ updateRegrets }) {
  let [villStrat, setVillStrat] = useState([.3333333, .3333333, .333333])
  let [regretsHistory, setRegretsHistory] = useState([]);
  let i = 0;
  let regretMap = {};
  const setRegretSum = regrets => {
    i++;
    updateRegrets(regrets);
  }
  let solver = new RPSSolver(villStrat, setRegretSum);
  solver.train(100000);
  console.log('zzz', solver.getAvgStrategy());


  return (
    <div>
      <VillainStratForm strat={villStrat} setStrat={setVillStrat} />
      <RegretVisualizer regrets={regretMap} />
    </div>
  )
}

export default connect(null, { updateRegrets })(RPSSolverInterface)
