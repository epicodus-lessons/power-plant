//Business Logic
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

//UI Logic
const updateDisplay = (state, plantNumber) => {
  $(`#${plantNumber}-soil-value`).text(state.soil);
  $(`#${plantNumber}-light-value`).text(state.light);
  $(`#${plantNumber}-water-value`).text(state.water);
}
const makeNewPlant = (plantNum) => {
  const stateChanger = storeState();
  $('.container').append(
    `<div class="grow-buttons">
        <button class="btn-success" id="${plantNum}-feed">Add soil</button>
        <button class="btn-success" id="${plantNum}-water">Add water</button>
        <button class="btn-success" id="${plantNum}-light">Add sunlight</button>
      </div>
      <h1>Plant ${plantNum}'s Values</h1>
      <h3>Soil:<div id="${plantNum}-soil-value">0</div></h3>
      <h3>Water:<div id="${plantNum}-water-value">0</div></h3>
      <h3>Light:<div id="${plantNum}-light-value">0</div></h3>`
  )
  $(`#${plantNum}-feed`).click(function() {
    const newState = stateChanger(feed);
    updateDisplay(newState, plantNum);
  });

  $(`#${plantNum}-water`).click(function() {
    const newState = stateChanger(hydrate);
    updateDisplay(newState, plantNum);
  });

  $(`#${plantNum}-light`).click(function() {
    const newState = stateChanger(giveLight);
    updateDisplay(newState, plantNum);
  });
}
//Doc ready
$(document).ready(function() {
  let plantNum = 0;
  $('#make-new').click(function() {
    plantNum ++;
    makeNewPlant(plantNum);
  });
});

