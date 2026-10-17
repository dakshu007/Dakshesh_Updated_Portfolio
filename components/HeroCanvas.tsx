"use client";

import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  IcosahedronGeometry,
  ShaderMaterial,
  Mesh,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  AdditiveBlending,
  NormalBlending,
  Color,
  Vector2,
  Group,
} from "three";

/* 3D simplex noise (Ashima Arts, MIT). */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const blobVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec2 uPointer;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
void main(){
  vec3 p = position;
  float t = uTime * 0.22;
  float n = snoise(normal * 1.15 + vec3(t, t * 0.8, t * 1.2));
  float n2 = snoise(normal * 3.2 + vec3(-t * 1.4, t, uPointer.x));
  float d = n * uAmp + n2 * 0.05;
  p += normal * d;
  vNoise = n;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const blobFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
  float band = 0.5 + 0.5 * sin(vNoise * 3.2 + uTime * 0.35 + vNormal.y * 2.4);
  vec3 col = mix(uC1, uC2, band);
  col = mix(col, uC3, smoothstep(0.25, 1.0, vNormal.x * 0.5 + 0.5) * 0.55);
  col = mix(col, uC4, fres * 0.85);
  // soft key light from top left
  float key = pow(max(dot(vNormal, normalize(vec3(-0.5, 0.8, 0.6))), 0.0), 18.0);
  col += key * 0.55;
  gl_FragColor = vec4(col, 1.0);
}
`;

const pointsVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSize;
attribute float aSeed;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.6 + aSeed * 6.2831) * 0.06;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * uPixelRatio * (6.0 / -mv.z);
  vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 1.3 + aSeed * 12.0));
  gl_Position = projectionMatrix * mv;
}
`;

const pointsFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, a * vAlpha * 0.9);
}
`;

/**
 * The hero centrepiece: an iridescent, noise-displaced orb with a slow halo
 * of particles. It leans toward the pointer, breathes with scroll, pauses when
 * off-screen or in a hidden tab, and renders one still frame under reduced
 * motion. Mounted lazily so it never blocks the first paint.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the CSS glow behind stays as the fallback.
    }
    const dpr = Math.min(window.devicePixelRatio, small ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const group = new Group();
    scene.add(group);

    const blobMat = new ShaderMaterial({
      vertexShader: blobVertex,
      fragmentShader: blobFragment,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.3 },
        uPointer: { value: new Vector2() },
        uC1: { value: new Color("#7B9BFF") },
        uC2: { value: new Color("#B79BFF") },
        uC3: { value: new Color("#FFB3D9") },
        uC4: { value: new Color("#F2F5FF") },
      },
    });
    const blob = new Mesh(new IcosahedronGeometry(1.35, small ? 48 : 96), blobMat);
    group.add(blob);

    // Particle halo
    const count = small ? 500 : 1100;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i] = 1.5 + Math.random() * 3.5;
      seeds[i] = Math.random();
    }
    const pGeo = new BufferGeometry();
    pGeo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    pGeo.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
    pGeo.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
    const pMat = new ShaderMaterial({
      vertexShader: pointsVertex,
      fragmentShader: pointsFragment,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        uColor: { value: new Color("#2B4BF2") },
      },
    });
    const points = new Points(pGeo, pMat);
    group.add(points);

    // Inner glow sprite ring, additive and faint
    const ringCount = small ? 120 : 220;
    const ringPos = new Float32Array(ringCount * 3);
    const ringSize = new Float32Array(ringCount);
    const ringSeed = new Float32Array(ringCount);
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2;
      const r = 2.15 + (Math.random() - 0.5) * 0.12;
      ringPos[i * 3] = Math.cos(a) * r;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      ringPos[i * 3 + 2] = Math.sin(a) * r;
      ringSize[i] = 2 + Math.random() * 2;
      ringSeed[i] = Math.random();
    }
    const rGeo = new BufferGeometry();
    rGeo.setAttribute("position", new Float32BufferAttribute(ringPos, 3));
    rGeo.setAttribute("aSize", new Float32BufferAttribute(ringSize, 1));
    rGeo.setAttribute("aSeed", new Float32BufferAttribute(ringSeed, 1));
    const rMat = pMat.clone();
    rMat.uniforms.uColor = { value: new Color("#7B4DFF") };
    rMat.blending = AdditiveBlending;
    const ring = new Points(rGeo, rMat);
    ring.rotation.x = 1.15;
    ring.rotation.z = 0.35;
    group.add(ring);

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

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let amp = 0.3;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const scrollP = Math.min(window.scrollY / window.innerHeight, 1);
      const speed = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y);
      amp += (0.28 + speed * 0.9 + scrollP * 0.25 - amp) * 0.06;

      blobMat.uniforms.uTime.value = t;
      blobMat.uniforms.uAmp.value = amp;
      blobMat.uniforms.uPointer.value.set(pointer.x, pointer.y);
      pMat.uniforms.uTime.value = t;
      rMat.uniforms.uTime.value = t;

      group.rotation.y = t * 0.08 + pointer.x * 0.45;
      group.rotation.x = pointer.y * 0.25;
      points.rotation.y = t * 0.05;
      ring.rotation.y = -t * 0.12;
      const s = 1 - scrollP * 0.12;
      group.scale.setScalar(s);
      group.position.y = scrollP * 0.6;

      renderer.render(scene, camera);
    };

    if (reduce) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      blob.geometry.dispose();
      blobMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      rGeo.dispose();
      rMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
