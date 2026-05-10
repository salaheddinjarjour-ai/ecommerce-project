import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  varying vec2 vUv;

  // Simple noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 m0 = 1.0 - 1.11477150180554 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    float t = u_time * 0.15;
    
    // Create multiple layers of noise for organic flow
    float n = snoise(p * 0.5 + t);
    n += 0.5 * snoise(p * 1.0 - t * 0.5);
    n += 0.25 * snoise(p * 2.0 + t * 0.2);
    
    // Map noise to color mixture
    float mixFactor = n * 0.5 + 0.5;
    mixFactor = smoothstep(0.1, 0.9, mixFactor);
    
    vec3 color = mix(u_color1, u_color2, mixFactor);
    
    // Add subtle brightness variations
    color += 0.05 * snoise(p * 5.0 + t);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const FlowShaderBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Uniforms
    const uniforms = {
      u_time: { value: 1.0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_color1: { value: new THREE.Color('#0452C8') }, // Primary
      u_color2: { value: new THREE.Color('#FE5750') }, // Secondary
    };

    // Geometry & Material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        varying vec2 vUv;

        // Simple noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          vec3 m0 = 1.0 - 1.11477150180554 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
          vec2 m = (u_mouse.xy / u_resolution.xy) * 2.0 - 1.0;
          
          float t = u_time * 0.1;
          
          // Mouse influence
          float d = length(p - m * 0.5);
          float mouseInfluence = smoothstep(0.8, 0.0, d) * 0.5;
          
          // Create multiple layers of noise
          float n = snoise(p * 0.4 + t + mouseInfluence);
          n += 0.4 * snoise(p * 0.8 - t * 0.4 - mouseInfluence * 0.3);
          
          float mixFactor = n * 0.5 + 0.5;
          mixFactor = smoothstep(0.1, 0.9, mixFactor);
          
          vec3 color = mix(u_color1, u_color2, mixFactor);
          
          // Add highlight around mouse
          color += vec3(0.05, 0.08, 0.1) * mouseInfluence;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    // Mouse Handler
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.x = e.clientX;
      uniforms.u_mouse.value.y = window.innerHeight - e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = (time: number) => {
      uniforms.u_time.value = time * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      id="flow-shader-container"
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none opacity-30"
      style={{ filter: 'blur(60px)' }}
    />
  );
};
