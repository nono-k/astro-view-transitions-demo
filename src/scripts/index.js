import GL from './gl';
import Blob from './gl/Blog';

import gsap from 'gsap';

class App {
  constructor(pageType) {
    this.gl = new GL();
    this.pageType = pageType;
    this.blob = this.createBlob();

    this.gl.scene.add(this.blob);
    this.initPage(this.pageType);
  }

  createBlob() {
    // size, speed, color, freq, density, strength, offset
    const blob = new Blob(1.7, 0.1, 0.7, 1.5, 0.1, Math.PI * 2);
    return blob;
  }

  initPage(type) {
    const cfg = this.getSettings(type);
    this.blob.position.set(...cfg.pos);
    this.blob.rotation.set(...cfg.rot);
    this.blob.material.uniforms.uHue.value = cfg.uniforms.color;
    this.blob.material.uniforms.uNoiseStrength.value = cfg.uniforms.strength;
  }

  setPageType(path) {
    const cfg = this.getSettings(path);

    gsap.to(this.blob.position, {
      x: cfg.pos[0],
      y: cfg.pos[1],
      z: cfg.pos[2],
      duration: 1.5,
      ease: 'power2.inOut',
    });

    gsap.to(this.blob.rotation, {
      x: cfg.rot[0],
      y: cfg.rot[1],
      z: cfg.rot[2],
      duration: 1.5,
      ease: 'power2.inOut',
    });

    gsap.to(this.blob.material.uniforms.uHue, {
      value: cfg.uniforms.color,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    gsap.to(this.blob.material.uniforms.uNoiseStrength, {
      value: cfg.uniforms.strength,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  }

  getSettings(path) {
    const base = import.meta.env.BASE_URL;
    let type = path.replace(base, '');
    if (type.startsWith('/member')) {
      type = '/member';
    }

    let settings;
    switch (type) {
      case '/about/':
        settings = {
          pos: [-2.8, 0.3, 2],
          rot: [0.1, 0.5, 0],
          uniforms: { color: 0.4, strength: 0.5 },
        };
        break;
      case '/member':
        settings = {
          pos: [-1.5, 2.0, -0.5],
          rot: [0, 0, 0],
          uniforms: { color: 0.6, strength: 0.2 },
        };
        break;
      case '/':
        settings = {
          pos: [2.8, -0.8, 1],
          rot: [-0.4, 0, -0.5],
          uniforms: { color: 0.7, strength: 0.1 },
        };
        break;
    }
    return settings;
  }
}

let app;

function initOrUpdateApp() {
  const path = window.location.pathname;
  if (!app) {
    app = new App(path);
  } else {
    app.setPageType(path);
  }
}

document.addEventListener('astro:after-swap', initOrUpdateApp);
document.addEventListener('astro:page-load', initOrUpdateApp);
