import State from './state.js';

// This may seem like the equivalent of a global variable but normally it would be injected into files where it is needed.
let state = new State();

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

// This is our function for creating new plants. It won't actually create new plants, though - instead, it needs to be passed into our update() function.
const addPlant = inputtedName => {
  name: inputtedName
  light: 0
  soil: 0
  water: 0
};

const determineAction = (object, action) => {
  switch(action) {
    case "add":
      return object;
    case "feed":
      return feed(object);
    case "hydrate":
      return hydrate(object);
    case "giveLight":
      return giveLight(object);
  }
}

const updater = (object, action) => {
  const newObject = determineAction(object, action);
  return state.update(newObject);

}