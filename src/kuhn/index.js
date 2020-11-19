import React, { useState } from 'react';
import { connect } from 'react-redux';

import KuhnSolver from './KuhnSolver';

import './kuhn.css';

function KuhnSolverInterface() {
  let solver = new KuhnSolver();
  solver.train(10000)
  for (let key in solver.infoSetMap) {
    console.log(`${key}          ${solver.infoSetMap[key].getAvgStrategy()}`);
  }

  return (
    <div>
      {solver.hello().repeat(5)}
      </div>
  )
}

export default KuhnSolverInterface;
