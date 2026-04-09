"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FieldShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  // Noise texture with LINEAR filtering — smooth interpolation instead of blocky nearest-neighbor
  const noiseTexture = useMemo(() => {
    const w = 256;
    const h = 256;
    const data = new Uint8Array(w * h * 4);
    for (let i = 0; i < w * h * 4; i++) data[i] = Math.floor(Math.random() * 256);
    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iChannel0: { value: noiseTexture },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noiseTexture]
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.iResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform float iTime;
          uniform vec2 iResolution;
          uniform sampler2D iChannel0;

          void main() {
            vec2 r = iResolution.xy;
            vec2 p = (gl_FragCoord.xy * 2.0 - r) / r.y * mat2(3.,4.,4.,-3.) / 1e2;

            vec4 S = vec4(0.0);
            vec4 C = vec4(1., 2., 3., 0.);
            vec4 W;

            // 32 iterations — enough to fill in the smoke gaps without harsh black holes,
            // divisor tuned to match (was 1e4 for 50 iters; scaled proportionally)
            for (float t = iTime, T = 0.1 * t + p.y, i = 0.; i < 32.; i += 1.) {
              S += (cos(W = sin(i) * C) + 1.)
                   * exp(sin(i + i * T))
                   / length(max(p,
                     p / vec2(2.0, texture2D(iChannel0, p / exp(W.x) + vec2(i, t) / 8.).r * 40.0)
                   )) / 6400.0;

              p += 0.02 * cos(i * (C.xz + 8.0 + i) + T + T);
            }

            // Softer tonemap: tanh(S) instead of tanh(S*S) — avoids the harsh
            // bright/black contrast that makes gaps look pixelated
            vec3 col = tanh(S.rgb * 1.4);

            // Warm amber tint to match --sand palette
            col *= vec3(1.15, 0.92, 0.52);

            // Dim to background level
            col *= 0.6;

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function StarshipShader({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#000000"]} />
        <FieldShader />
      </Canvas>
    </div>
  );
}
