import * as THREE from "three";
import Boid from "./Boid.js";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Boids {
  constructor(scene, boidsCount, boidBox) {
    // make the boids box
    const boidBoxMesh = new THREE.LineSegments(
      box(boidBox),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
      })
    );
    boidBoxMesh.computeLineDistances();
    boidBoxMesh.translateY(Math.ceil(boidBox.height / 2));
    scene.add(boidBoxMesh);

    // generate the boids
    this.boidsArray = [];
    const numberOfBoids = boidsCount;
    const boidGeo = new THREE.ConeGeometry(1, 3.9, 12);
    boidGeo.rotateX(Math.PI * 0.5);
    const minX = boidBoxMesh.position.x - Math.floor(boidBox.width / 2);
    const maxX = boidBoxMesh.position.x + Math.floor(boidBox.width / 2);
    const minY = boidBoxMesh.position.y - Math.floor(boidBox.height / 2);
    const maxY = boidBoxMesh.position.y + Math.floor(boidBox.height / 2);
    const minZ = boidBoxMesh.position.z - Math.floor(boidBox.depth / 2);
    const maxZ = boidBoxMesh.position.z + Math.floor(boidBox.depth / 2);
    for (let i = 0; i < numberOfBoids; i++) {
      const boidMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const boidMesh = new THREE.Mesh(boidGeo, boidMat);
      boidMesh.translateX(randomIntFromInterval(minX, maxX));
      //   boidMesh.translateY(randomIntFromInterval(minY, maxY));
      boidMesh.translateZ(randomIntFromInterval(minZ, maxZ));
      const newBoid = new Boid(boidMesh, scene);
      newBoid.setXBounds(minX, maxX);
      newBoid.setYBounds(minY, maxY);
      newBoid.setZBounds(minZ, maxZ);
      this.boidsArray.push(newBoid);
    }

    // main boid factors
    this.avoidFactor = 50;
    this.alignFactor = 50;
    this.centeringFactor = 50;
    this.radiusOfVision = 25;

    // for adding boids
    this.bounds = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      minZ: minZ,
      maxZ: maxZ,
    };
    this.boidGeo = boidGeo;

    // for modifying box
    this.boidBoxMesh = boidBoxMesh;
  }
  get(index) {
    return this.boidsArray[index];
  }
  length() {
    return this.boidsArray.length;
  }
  newBox(scene, boidBox) {
    scene.remove(this.boidBoxMesh);
    // make the boids box
    const boidBoxMesh = new THREE.LineSegments(
      box(boidBox),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
      })
    );
    boidBoxMesh.computeLineDistances();
    boidBoxMesh.translateY(Math.ceil(boidBox.height / 2));
    scene.add(boidBoxMesh);

    const minX = boidBoxMesh.position.x - Math.floor(boidBox.width / 2);
    const maxX = boidBoxMesh.position.x + Math.floor(boidBox.width / 2);
    const minY = boidBoxMesh.position.y - Math.floor(boidBox.height / 2);
    const maxY = boidBoxMesh.position.y + Math.floor(boidBox.height / 2);
    const minZ = boidBoxMesh.position.z - Math.floor(boidBox.depth / 2);
    const maxZ = boidBoxMesh.position.z + Math.floor(boidBox.depth / 2);

    for (let boid of this.boidsArray) {
      boid.setXBounds(minX, maxX);
      boid.setYBounds(minY, maxY);
      boid.setZBounds(minZ, maxZ);
    }

    this.boidBoxMesh = boidBoxMesh;
  }
  addBoids(scene, n) {
    for (let i = 0; i < n; i++) {
      const boidMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const boidMesh = new THREE.Mesh(this.boidGeo, boidMat);
      boidMesh.translateX(
        randomIntFromInterval(this.bounds.minX, this.bounds.maxX)
      );
      boidMesh.translateZ(
        randomIntFromInterval(this.bounds.minZ, this.bounds.maxZ)
      );
      const newBoid = new Boid(boidMesh, scene);
      newBoid.setXBounds(this.bounds.minX, this.bounds.maxX);
      newBoid.setYBounds(this.bounds.minY, this.bounds.maxY);
      newBoid.setZBounds(this.bounds.minZ, this.bounds.maxZ);
      this.boidsArray.push(newBoid);
    }
  }
  removeBoids(scene, n) {
    for (let i = 0; i < n; i++) {
      let boidToRemove = this.boidsArray.pop();
      boidToRemove.removeMesh(scene);
    }
  }
  moveBoids() {
    for (let i = 0; i < this.boidsArray.length; i++) {
      // Separation
      let distX = 0;
      let distY = 0;
      let distZ = 0;
      for (let j = 0; j < this.boidsArray.length; j++) {
        if (
          this.boidsArray[j].mesh.id !== this.boidsArray[i].mesh.id &&
          this.boidsArray[i].isBoidInSight(
            this.boidsArray[j],
            Math.floor(this.radiusOfVision / 2)
          )
        ) {
          let boid = this.boidsArray[i];
          let otherBoid = this.boidsArray[j];
          distX += boid.mesh.position.x - otherBoid.mesh.position.x;
          distY += boid.mesh.position.y - otherBoid.mesh.position.y;
          distZ += boid.mesh.position.z - otherBoid.mesh.position.z;
        }
      }
      this.boidsArray[i].addToVelocity(
        distX * (this.avoidFactor / 6600),
        distY * (this.avoidFactor / 6600),
        distZ * (this.avoidFactor / 6600)
      );

      // Alignment
      let velAvgX = 0;
      let velAvgY = 0;
      let velAvgZ = 0;
      let boidNeighborCount = 0;
      for (let j = 0; j < this.boidsArray.length; j++) {
        if (
          this.boidsArray[j].mesh.id !== this.boidsArray[i].mesh.id &&
          this.boidsArray[i].isBoidInSight(
            this.boidsArray[j],
            this.radiusOfVision
          )
        ) {
          velAvgX += this.boidsArray[j].velocity.x;
          velAvgY += this.boidsArray[j].velocity.y;
          velAvgZ += this.boidsArray[j].velocity.z;
          boidNeighborCount += 1;
        }
      }
      if (boidNeighborCount > 0) {
        velAvgX /= boidNeighborCount;
        velAvgY /= boidNeighborCount;
        velAvgZ /= boidNeighborCount;
        let boid = this.boidsArray[i];
        boid.velocity.x +=
          (velAvgX - boid.velocity.x) * (this.alignFactor / 500);
        boid.velocity.y +=
          (velAvgY - boid.velocity.y) * (this.alignFactor / 500);
        boid.velocity.z +=
          (velAvgZ - boid.velocity.z) * (this.alignFactor / 500);
      }

      // Cohesion
      let posAvgX = 0;
      let posAvgY = 0;
      let posAvgZ = 0;
      boidNeighborCount = 0;
      for (let j = 0; j < this.boidsArray.length; j++) {
        if (
          this.boidsArray[j].mesh.id !== this.boidsArray[i].mesh.id &&
          this.boidsArray[i].isBoidInSight(
            this.boidsArray[j],
            this.radiusOfVision
          )
        ) {
          posAvgX += this.boidsArray[j].mesh.position.x;
          posAvgY += this.boidsArray[j].mesh.position.y;
          posAvgZ += this.boidsArray[j].mesh.position.z;
          boidNeighborCount += 1;
        }
      }
      if (boidNeighborCount > 0) {
        posAvgX /= boidNeighborCount;
        posAvgY /= boidNeighborCount;
        posAvgZ /= boidNeighborCount;
        let boid = this.boidsArray[i];
        boid.velocity.x +=
          (posAvgX - boid.mesh.position.x) * (this.centeringFactor / 12500);
        boid.velocity.y +=
          (posAvgY - boid.mesh.position.y) * (this.centeringFactor / 12500);
        boid.velocity.z +=
          (posAvgZ - boid.mesh.position.z) * (this.centeringFactor / 12500);
      }

      this.boidsArray[i].move();
    }
  }
}

function box(boidBox) {
  let width = boidBox.width * 0.5;
  let height = boidBox.height * 0.5;
  let depth = boidBox.depth * 0.5;

  const geometry = new THREE.BufferGeometry();
  const position = [];

  position.push(
    -width,
    -height,
    -depth,
    -width,
    height,
    -depth,

    -width,
    height,
    -depth,
    width,
    height,
    -depth,

    width,
    height,
    -depth,
    width,
    -height,
    -depth,

    width,
    -height,
    -depth,
    -width,
    -height,
    -depth,

    -width,
    -height,
    depth,
    -width,
    height,
    depth,

    -width,
    height,
    depth,
    width,
    height,
    depth,

    width,
    height,
    depth,
    width,
    -height,
    depth,

    width,
    -height,
    depth,
    -width,
    -height,
    depth,

    -width,
    -height,
    -depth,
    -width,
    -height,
    depth,

    -width,
    height,
    -depth,
    -width,
    height,
    depth,

    width,
    height,
    -depth,
    width,
    height,
    depth,

    width,
    -height,
    -depth,
    width,
    -height,
    depth
  );

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(position, 3)
  );

  return geometry;
}

export default Boids;
