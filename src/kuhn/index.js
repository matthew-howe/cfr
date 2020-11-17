import React, { useState } from 'react';
import { connect } from 'react-redux';

import KuhnSolver from './KuhnSolver';

import './kuhn.css';

function KuhnSolverInterface() {
  let solver = new KuhnSolver();

  return (
    <div>
      {solver.hello().repeat(5)}
      </div>
  )
}

export default KuhnSolverInterface;
