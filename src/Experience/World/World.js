import Experience from "../Experience.js";
import * as THREE from 'three';
import Environment from "./Environment.js";

export default class World {
  constructor() {
    this.experience = new Experience()

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({wireframe: true})
    )
    this.experience.scene.add(testMesh)

    // Setup
    this.environment = new Environment()
  }
}