"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createEmberTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Outer soft glow
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, "rgba(255, 220, 120, 1)");
  glow.addColorStop(0.15, "rgba(255, 140, 30, 0.95)");
  glow.addColorStop(0.4, "rgba(220, 60, 10, 0.6)");
  glow.addColorStop(0.7, "rgba(180, 30, 0, 0.2)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

export default function EmberParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const width = el.clientWidth || window.innerWidth;
    const height = el.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.z = 14;

    const emberTexture = createEmberTexture();

    // --- Main ember particles ---
    const COUNT = 280;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const vx: number[] = [];
    const vy: number[] = [];
    const phase: number[] = [];
    const life: number[] = [];
    const maxLife: number[] = [];
    const baseSize: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      // spawn across full width, concentrated toward lower center
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * -22 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const heat = Math.random();
      // core embers: bright yellow-white center → orange → deep red
      colors[i * 3]     = 0.9 + heat * 0.1;
      colors[i * 3 + 1] = 0.1 + heat * 0.45;
      colors[i * 3 + 2] = heat * 0.05;

      const s = 8 + Math.random() * 22;
      sizes[i] = s;
      baseSize.push(s);

      vx.push((Math.random() - 0.5) * 0.018);
      vy.push(0.03 + Math.random() * 0.055);
      phase.push(Math.random() * Math.PI * 2);

      const l = Math.random();
      life.push(l);
      maxLife.push(0.55 + Math.random() * 0.45);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      map: emberTexture,
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      alphaTest: 0.001,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Fine micro-sparks layer ---
    const SPARK_COUNT = 120;
    const sparkPos = new Float32Array(SPARK_COUNT * 3);
    const sparkVx: number[] = [];
    const sparkVy: number[] = [];
    const sparkLife: number[] = [];
    const sparkMaxLife: number[] = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      sparkPos[i * 3]     = (Math.random() - 0.5) * 20;
      sparkPos[i * 3 + 1] = Math.random() * -20 - 2;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sparkVx.push((Math.random() - 0.5) * 0.03);
      sparkVy.push(0.04 + Math.random() * 0.08);
      const l = Math.random();
      sparkLife.push(l);
      sparkMaxLife.push(0.3 + Math.random() * 0.4);
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));

    const sparkMat = new THREE.PointsMaterial({
      map: emberTexture,
      size: 0.1,
      color: new THREE.Color(1, 0.6, 0.1),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      alphaTest: 0.001,
    });

    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    let animId: number;
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      const pos  = geometry.attributes.position.array as Float32Array;
      const col  = geometry.attributes.color.array as Float32Array;
      const sz   = geometry.attributes.size.array as Float32Array;
      const sPos = sparkGeo.attributes.position.array as Float32Array;

      // --- Main embers ---
      for (let i = 0; i < COUNT; i++) {
        life[i] += 0.004 + Math.random() * 0.001;

        // sinuous rise — unique frequency per particle
        const wind = Math.sin(life[i] * 2.5 + phase[i]) * 0.008
                   + Math.sin(life[i] * 5.1 + phase[i] * 1.7) * 0.003;
        pos[i * 3]     += vx[i] + wind;
        pos[i * 3 + 1] += vy[i];
        pos[i * 3 + 2] += Math.sin(life[i] * 1.8 + phase[i]) * 0.004;

        // life-cycle alpha: fade in → burn → fade out
        const t = life[i] / maxLife[i];
        const alpha = t < 0.15 ? t / 0.15 : t > 0.65 ? Math.max(0, 1 - (t - 0.65) / 0.35) : 1;

        // colour shift: start yellow-orange, cool to red as it rises
        col[i * 3]     = (0.9 + (1 - t) * 0.1);
        col[i * 3 + 1] = (0.1 + (1 - t) * 0.45) * alpha;
        col[i * 3 + 2] = 0;

        // size throb
        sz[i] = baseSize[i] * alpha * (0.85 + Math.sin(life[i] * 8 + phase[i]) * 0.15);

        if (life[i] >= maxLife[i] || pos[i * 3 + 1] > 13) {
          pos[i * 3]     = (Math.random() - 0.5) * 26;
          pos[i * 3 + 1] = -10 - Math.random() * 6;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
          life[i] = 0;
          vx[i]   = (Math.random() - 0.5) * 0.018;
          vy[i]   = 0.03 + Math.random() * 0.055;
        }
      }

      // --- Micro sparks ---
      for (let i = 0; i < SPARK_COUNT; i++) {
        sparkLife[i] += 0.007 + Math.random() * 0.003;
        sPos[i * 3]     += sparkVx[i] + (Math.random() - 0.5) * 0.01;
        sPos[i * 3 + 1] += sparkVy[i];

        if (sparkLife[i] >= sparkMaxLife[i] || sPos[i * 3 + 1] > 13) {
          sPos[i * 3]     = (Math.random() - 0.5) * 20;
          sPos[i * 3 + 1] = -8 - Math.random() * 6;
          sparkLife[i] = 0;
          sparkVx[i]   = (Math.random() - 0.5) * 0.03;
          sparkVy[i]   = 0.04 + Math.random() * 0.08;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate    = true;
      geometry.attributes.size.needsUpdate     = true;
      sparkGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      emberTexture.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
