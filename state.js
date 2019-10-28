export default class State {
  constructor() {
    this.plants = {}
  }

  static update(plantObject) {
    this.plants[plantObject.name] = plantObject;
  }
}