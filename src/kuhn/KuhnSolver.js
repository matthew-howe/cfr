const Actions = ['B', 'C'];

class InformationSet {
  constructor() {
    this.cumulativeRegrets = [0, 0];
    this.strategySum = [0, 0];
    this.numActions = Actions.length;
  }

  normalize(strategy) {
    let normalized = strategy.slice();
    const sum = strategy.reduce((a, b) => a + b);
    if (sum > 0) {
      for (let i = 0; i < 2; i++) {
        normalized[i] /= sum;
      }
    } else {
      // console.log(this.cumulativeRegrets);
      normalized = [0.5, 0.5];
    }
    return normalized;
  }

  getStrategy(reachProb) {
    let strategy = this.cumulativeRegrets.map(el => (el > 0 ? el : 0));
    let normalizedStrat = this.normalize(strategy);
      
    let weightedStrat = normalizedStrat.map(el => el * reachProb);
    for (let i = 0; i < 2; i++) {
      this.strategySum[i] += weightedStrat[i];
    }

    return weightedStrat;
  }

  getAvgStrategy() {
    return this.normalize(this.strategySum.slice());
  }
}

class KuhnSolver {
  constructor() {
    this.infoSetMap = {};
    this.actions = ['B', 'C'];
  }

  hello() {
    return 'Hello World';
  }

  isTerminal(history) {
    return ['BC', 'BB', 'CC', 'CBB', 'CBC'].includes(history);
  }

  getPayoff(history, cards) {
    if (['BC', 'CBC'].includes(history)) {
      return +1;
    } else {
      let payoff = history.includes('B') ? 2 : 1;
      let activePlayer = history.length % 2;
      let playerCard = cards[activePlayer];
      let villCard = cards[(activePlayer + 1) % 2];
      if (playerCard === 'K' || villCard === 'J') {
        return payoff;
      } else {
        return -payoff;
      }
    }
  }

  getInformationSet(cardAndHistory) {
    if (!this.infoSetMap[cardAndHistory]) {
      this.infoSetMap[cardAndHistory] = new InformationSet();
    }
    return this.infoSetMap[cardAndHistory];
  }

  cfr(cards, history, reachProbs, activePlayer) {
    if (this.isTerminal(history)) {
      return this.getPayoff(history, cards);
    }

    let myCard = cards[activePlayer];
    let infoSet = this.getInformationSet(myCard + history);
    let strategy = infoSet.getStrategy(reachProbs[activePlayer]);
    let villain = (activePlayer + 1) % 2;
    let counterfactualVals = [0, 0];

    for (let i = 0; i < 2; i++) {
      let actionProb = strategy[i];
      let newReachProbs = reachProbs.slice();

      // compute new reach probabilities after this action
      newReachProbs[activePlayer] *= actionProb;

      // recursively call cfr method, next player is the villain
      counterfactualVals[i] = -this.cfr(
        cards,
        history + this.actions[i],
        newReachProbs,
        villain,
      );
    }

    // value of the curent game state is just counterfactual values
    // weighted by action probabilities
    let nodeValue = counterfactualVals.reduce((acc, el, idx) => {
      return acc +(el * strategy[idx]);
    }, 0);

    for (let k = 0; k < 2; k++) {
      let val = counterfactualVals[k] - nodeValue;
      let val2;
      val2 = reachProbs[villain] * val;
      infoSet.cumulativeRegrets[k] += val2;
    }

    // if (infoSet.cumulativeRegrets.every(el => el < 0)) console.log(infoSet, '\n', myCard + history);
    return nodeValue;
  }

  train(iterations) {
    let util = 0;
    let kuhnCards = ['J', 'Q', 'K'];
    for (let i = 0; i < iterations; i++) {
      let cards = this.getRandomSubarray(kuhnCards, 2);
      let history = '';
      let reachProbs = [1, 1];
      util += this.cfr(cards, history, reachProbs, 0);
    }
    return util;
  }

  getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0),
      i = arr.length,
      temp,
      index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }
}

export default KuhnSolver;
