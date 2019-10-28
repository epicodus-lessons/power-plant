import State from './state.js';

// This may seem like the equivalent of a global variable but normally it would be injected into files where it is needed.
let state = new State();

// This is our function for creating new plants. It won't actually create new plants, though - instead, it needs to be passed into our update() function.
const addPlant = inputtedName => {
    name: inputtedName
    light: 0
    soil: 0
    water: 0
};

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : state[prop] + value
    })
  }
}

const feed = changeState("soil");
const hydrate = changeState("water");
const giveLight = changeState("light");

const blueFood = changeState("soil")(5)
const greenFood = changeState("soil")(10)
const yuckyFood = changeState("soil")(-5)

// To actually make updates to our store, we will call the following method:
state.update(plant);