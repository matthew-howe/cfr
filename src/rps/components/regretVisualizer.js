import React, { useState, Component } from 'react';
import { connect } from 'react-redux';

import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

class RegretVisualizer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
    }
  }

  renderRegrets(regrets) {
    return regrets.map(el => {
      return (
        <div>
          <span>
            {el[0]}
            </span> 
          <span>
            {el[1]}
            </span> 
          <span>
            {el[2]}
            </span>
          </div>
      )
    })
  }

  render() {
    const regretsRock = {name: "Rock", data: {}}
    const regretsPaper = {name: "Paper", data: {}}
    const regretsScissors = {name: "Scissors", data: {}}
    let i = 0;
    for (const key in this.props.regrets) {
      regretsRock.data[i] = this.props.regrets[key][0];
      regretsPaper.data[i] = this.props.regrets[key][1];
      regretsScissors.data[i] = this.props.regrets[key][2];
      i++
    }
    const allRegrets = [regretsRock, regretsPaper, regretsScissors];
    console.log(allRegrets);

    return <LineChart data={allRegrets} />
  }
}

const mapState = (state) => {
  return {
    regrets: state.rps.regrets
  }
}

export default connect(mapState)(RegretVisualizer);
