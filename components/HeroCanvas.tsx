"use client";

import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  NormalBlending,
  Vector2,
} from "three";

/** Shapes the particles morph between, with the caption shown for each. */
export const SHAPES = ["130 countries reached", "Dakshesh B", "Code that ships"] as const;

const vertex = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uIntro;
uniform vec2 uMouse;
uniform float uPixelRatio;
uniform float uSize;
attribute vec3 aGlobe;
attribute vec3 aLogo;
attribute vec3 aCode;
attribute vec3 aScatter;
attribute float aSeed;
varying float vMix;
varying float vGlow;
varying float vDepth;

vec3 shapeAt(float m){
  float s = mod(m, 3.0);
  float t = fract(s);
  t = t * t * (3.0 - 2.0 * t);
  if (s < 1.0) return mix(aGlobe, aLogo, t);
  if (s < 2.0) return mix(aLogo, aCode, t);
  return mix(aCode, aGlobe, t);
}

void main(){
  // Stagger each particle a little so morphs ripple instead of snapping.
  float m = uMorph - aSeed * 0.18;
  vec3 p = shapeAt(max(m, 0.0));
  p = mix(aScatter, p, uIntro);

  // Breathing drift
  p.x += sin(uTime * 0.7 + aSeed * 40.0) * 0.012;
  p.y += cos(uTime * 0.6 + aSeed * 30.0) * 0.012;

  vec4 world = modelMatrix * vec4(p, 1.0);

  // Pointer repulsion in screen-ish space
  vec2 d = world.xy - uMouse;
  float dist = length(d);
  float force = smoothstep(0.75, 0.0, dist);
  world.xy += normalize(d + 1e-4) * force * 0.38;
  world.z += force * 0.4;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio * (0.65 + aSeed * 0.7) * (6.0 / -mv.z);

  vMix = clamp((p.x + 1.8) / 3.6, 0.0, 1.0);
  vGlow = force;
  vDepth = clamp((world.z + 1.2) / 2.4, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
varying float vMix;
varying float vGlow;
varying float vDepth;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.15, d);
  vec3 col = vMix < 0.5 ? mix(uA, uB, vMix * 2.0) : mix(uB, uC, (vMix - 0.5) * 2.0);
  col = mix(col, vec3(1.0, 0.45, 0.75), vGlow * 0.6);
  float alpha = a * (0.45 + 0.55 * vDepth);
  gl_FragColor = vec4(col, alpha);
}
`;

/** Rasterise a drawing to a canvas and sample N points from its filled pixels. */
function sampleShape(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  count: number,
  scale: number,
  depth: number
): Float32Array {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  draw(ctx, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const filled: number[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (data[(y * size + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const out = new Float32Array(count * 3);
  const n = filled.length / 2 || 1;
  for (let i = 0; i < count; i++) {
    const k = Math.floor(Math.random() * n) * 2;
    const jx = Math.random() - 0.5;
    const jy = Math.random() - 0.5;
    out[i * 3] = ((filled[k] + jx) / size - 0.5) * scale;
    out[i * 3 + 1] = -((filled[k + 1] + jy) / size - 0.5) * scale;
    out[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return out;
}

/** The cloud "D" from the logo, as fill. */
function drawLogo(ctx: CanvasRenderingContext2D, size: number) {
  ctx.save();
  ctx.scale(size / 100, size / 100);
  ctx.fillStyle = "#000";
  ctx.fill(
    new Path2D(
      "M28 30 H50 C71 30 82 41 82 55 C82 69 71 80 50 80 H28 Z M43 44 H50 C60 44 64.5 49 64.5 55 C64.5 61 60 66 50 66 H43 Z"
    ),
    "evenodd"
  );
  const cloud = new Path2D();
  cloud.roundRect(24, 24, 52, 10, 5);
  [
    [31, 26, 7],
    [43, 22, 9],
    [56, 24, 8],
    [68, 27, 6],
  ].forEach(([x, y, r]) => {
    cloud.moveTo(x + r, y);
    cloud.arc(x, y, r, 0, Math.PI * 2);
  });
  ctx.fill(cloud);
  ctx.restore();
}

function drawCode(ctx: CanvasRenderingContext2D, size: number) {
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${size * 0.42}px ui-monospace, Menlo, monospace`;
  ctx.fillText("</>", size / 2, size / 2);
}

function globe(count: number, r: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    out[i * 3] = Math.cos(th) * rad * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(th) * rad * r;
  }
  return out;
}

/**
 * Hero centrepiece: thousands of particles that hold the shape of a globe,
 * the cloud "D" logo and a code bracket, morphing between them every few
 * seconds, scattering away from the pointer and tilting in 3D. Pauses when
 * off-screen or hidden, renders a still frame under reduced motion.
 */
export default function HeroCanvas({ onShape }: { onShape?: (index: number) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onShapeRef = useRef(onShape);
  onShapeRef.current = onShape;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const count = small ? 3000 : 6500;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, small ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1.2s ease";
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const scatter = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      scatter[i * 3] = (Math.random() - 0.5) * 9;
      scatter[i * 3 + 1] = (Math.random() - 0.5) * 6;
      scatter[i * 3 + 2] = (Math.random() - 0.5) * 4;
      seeds[i] = Math.random();
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(globe(count, 1.55), 3));
    geo.setAttribute("aGlobe", new Float32BufferAttribute(globe(count, 1.55), 3));
    geo.setAttribute("aLogo", new Float32BufferAttribute(sampleShape(drawLogo, count, 4.4, 0.35), 3));
    geo.setAttribute("aCode", new Float32BufferAttribute(sampleShape(drawCode, count, 4.2, 0.35), 3));
    geo.setAttribute("aScatter", new Float32BufferAttribute(scatter, 3));
    geo.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));

    const mat = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uIntro: { value: reduce ? 1 : 0 },
        uMouse: { value: new Vector2(99, 99) },
        uPixelRatio: { value: dpr },
        uSize: { value: small ? 3.4 : 4 },
        uA: { value: [0.17, 0.29, 0.95] },
        uB: { value: [0.48, 0.3, 1.0] },
        uC: { value: [0.88, 0.28, 0.62] },
      },
    });
    const points = new Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer mapped onto the z = 0 plane in world units.
    const pointer = { x: 99, y: 99, tx: 99, ty: 99, nx: 0, ny: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      pointer.tx = nx * halfH * camera.aspect;
      pointer.ty = ny * halfH;
      pointer.nx = Math.max(-1, Math.min(1, nx));
      pointer.ny = Math.max(-1, Math.min(1, ny));
    };
    const onLeave = () => {
      pointer.tx = 99;
      pointer.ty = 99;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let morph = 0;
    let target = 0;
    let shape = -1;
    const HOLD = 3.6;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      mat.uniforms.uIntro.value = Math.min(1, mat.uniforms.uIntro.value + dt * 0.55);
      const intro = mat.uniforms.uIntro.value;

      // Hold each shape, then glide to the next.
      if (t > 1.8 && t % HOLD < dt) target += 1;
      morph += (target - morph) * Math.min(1, dt * 2.2);
      mat.uniforms.uMorph.value = morph;

      const current = Math.round(morph) % 3;
      if (current !== shape) {
        shape = current;
        onShapeRef.current?.(shape);
      }

      if (pointer.tx === 99) {
        pointer.x += (99 - pointer.x) * 0.1;
        pointer.y += (99 - pointer.y) * 0.1;
      } else {
        if (pointer.x === 99) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
        pointer.x += (pointer.tx - pointer.x) * 0.15;
        pointer.y += (pointer.ty - pointer.y) * 0.15;
      }
      mat.uniforms.uMouse.value.set(pointer.x, pointer.y);
      mat.uniforms.uTime.value = t;

      const globeSpin = shape === 0 ? t * 0.25 : 0;
      points.rotation.y += ((pointer.nx * 0.35 + globeSpin) - points.rotation.y) * 0.05;
      points.rotation.x += ((-pointer.ny * 0.2) - points.rotation.x) * 0.05;
      const scrollP = Math.min(window.scrollY / window.innerHeight, 1);
      points.position.y = scrollP * 0.8;
      points.scale.setScalar(1 - scrollP * 0.15);

      renderer.render(scene, camera);
      if (intro > 0.02) renderer.domElement.style.opacity = "1";
    };

    if (reduce) {
      mat.uniforms.uMorph.value = 1;
      renderer.render(scene, camera);
      renderer.domElement.style.opacity = "1";
      onShapeRef.current?.(1);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
