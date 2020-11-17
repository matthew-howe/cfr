const UPDATE_REGRETS = 'UPDATE_REGRETS';

const initialState = {
  count: 0,
  regrets: [],
};

export const updateRegrets = (regrets) => ({
    type: UPDATE_REGRETS,
    regrets: regrets,
});



export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_REGRETS:
      let newState = Object.assign({}, state)
      newState.regrets.push(action.regrets);
      newState.count = state.count +1;
      return newState;
    default:
      return state;
  }
}
