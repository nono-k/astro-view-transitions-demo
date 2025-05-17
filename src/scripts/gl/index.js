import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import Blob from './Blog';

export default class GL {
  constructor() {
    const canvas = document.querySelector('.webgl');
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 0);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 10);

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.mouse = new THREE.Vector2();
    this.mouseTarget = new THREE.Vector2();

    this.init();
    this.animate();
  }

  init() {
    // this.addCanvas();
    this.addEvents();
  }

  // addCanvas() {
  //   const canvas = this.renderer.domElement;
  //   canvas.classList.add('webgl');
  //   document.body.appendChild(canvas);
  // }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);

    this.camera.updateProjectionMatrix();
  }

  mouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.scene.traverse(child => {
      if (
        child.isMesh &&
        child.material &&
        child.material.uniforms &&
        child.material.uniforms.uTime
      ) {
        child.material.uniforms.uTime.value = this.clock.getElapsedTime();
      }
    });

    this.mouseTarget.x = gsap.utils.interpolate(
      this.mouseTarget.x,
      this.mouse.x,
      0.03,
    );
    this.mouseTarget.y = gsap.utils.interpolate(
      this.mouseTarget.y,
      this.mouse.y,
      0.03,
    );

    this.scene.rotation.set(
      this.mouseTarget.y * 0.25,
      this.mouseTarget.x * 0.25,
      0,
    );

    this.renderer.render(this.scene, this.camera);
  }
}
