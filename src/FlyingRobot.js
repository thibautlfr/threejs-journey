import Robot from "./Robot.js";

export default class FlyingRobot extends Robot {
  constructor(name, legs) {
    super(name, legs);
  }

  sayHi() {
    console.log('Hello! My name is ${this.name} and I can fly!');
  }

  takeOff() {
    console.log(`${this.name} is taking off!`);
  }

  land() {
    console.log(`${this.name} is landing!`);
  }
}