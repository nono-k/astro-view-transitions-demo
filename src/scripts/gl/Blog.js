import * as THREE from 'three';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export default class Blob extends THREE.Object3D {
  constructor(size, speed, color, density, strength, offset) {
    super();

    this.geometry = new THREE.IcosahedronGeometry(size, 64);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 5 },
        uHue: { value: color },
        uOffset: { value: offset },
        red: { value: 0 },
        green: { value: 0 },
        blue: { value: 0 },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI,
      },
      // wireframe: true,
      // side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
  dispose() {
    if (this.mesh) {
      this.remove(this.mesh); // Object3D から削除
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.mesh.material) this.mesh.material.dispose();
    }
  }
}
