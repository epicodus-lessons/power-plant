const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil")(1);
const hydrate = changeState("water")(1);
const giveLight = changeState("light")(1);

const storeState = () => {
  let oldState = {};
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(oldState);
    oldState = {...newState};
    return newState;
  }
}

const stateChanger = storeState();

const updateDisplay = (state) => {
  $('#soil-value').text(state.soil);
  $('#light-value').text(state.light);
  $('#water-value').text(state.water);
}

$(document).ready(function() {

  $('#feed').click(function() {
    const newState = stateChanger(feed);
    updateDisplay(newState);
  });

  $('#water').click(function() {
    const newState = stateChanger(hydrate);
    updateDisplay(newState);
  });

  $('#light').click(function() {
    const newState = stateChanger(giveLight);
    updateDisplay(newState);
  });
});
