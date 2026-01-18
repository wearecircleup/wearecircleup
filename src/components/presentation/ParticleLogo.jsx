import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Vertex shader for particle positioning and mouse interaction
const vertexShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDisplacement;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  
  attribute vec2 aCoordinates;
  attribute float aSpeed;
  attribute float aOffset;
  attribute float aDirection;
  attribute float aPress;
  
  varying vec3 vColor;
  
  void main() {
    vec3 colorTexture = texture2D(uTexture, aCoordinates).rgb;
    
    // Only show particles where there's actual image data
    if(colorTexture.r < 0.1 && colorTexture.g < 0.1 && colorTexture.b < 0.1) {
      gl_Position = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }
    
    vec3 pos = position;
    
    // Mouse displacement
    vec3 displacement = texture2D(uDisplacement, aCoordinates).rgb;
    float displacementForce = displacement.r;
    
    pos.z += displacementForce * uStrength * aPress;
    pos.x += cos(aDirection) * displacementForce * uStrength * aPress * 0.3;
    pos.y += sin(aDirection) * displacementForce * uStrength * aPress * 0.3;
    
    // Floating animation
    pos.z += sin(uTime * aSpeed + aOffset) * 0.05;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Particle size based on distance
    gl_PointSize = 2.5 * (1.0 / -mvPosition.z);
    
    vColor = colorTexture;
  }
`;

// Fragment shader for particle coloring
const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if(dist > 0.5) discard;
    
    // Soft edges
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function Particles({ imageUrl }) {
  const meshRef = useRef();
  const displacementCanvasRef = useRef();
  const displacementTextureRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const { size, viewport } = useThree();
  
  // Load the logo texture
  const texture = useTexture(imageUrl);
  
  // Create displacement canvas for mouse interaction
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    displacementCanvasRef.current = canvas;
    
    const displacementTexture = new THREE.CanvasTexture(canvas);
    displacementTextureRef.current = displacementTexture;
    
    return () => {
      displacementTexture.dispose();
    };
  }, []);
  
  // Create particle system
  const { geometry, material, particleCount } = useMemo(() => {
    if (!texture.image) return { geometry: null, material: null, particleCount: 0 };
    
    const img = texture.image;
    const width = 128; // Reduced for performance
    const height = Math.floor((img.height / img.width) * width);
    
    // Create canvas to read pixel data
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    
    const numParticles = width * height;
    const positions = new Float32Array(numParticles * 3);
    const coordinates = new Float32Array(numParticles * 2);
    const speeds = new Float32Array(numParticles);
    const offsets = new Float32Array(numParticles);
    const directions = new Float32Array(numParticles);
    const press = new Float32Array(numParticles);
    
    let index = 0;
    
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const pixelIndex = (i * width + j) * 4;
        
        // Position in 3D space (centered)
        positions[index * 3 + 0] = (j / width - 0.5) * viewport.width;
        positions[index * 3 + 1] = -(i / height - 0.5) * viewport.height;
        positions[index * 3 + 2] = 0;
        
        // UV coordinates for texture sampling
        coordinates[index * 2 + 0] = j / width;
        coordinates[index * 2 + 1] = i / height;
        
        // Random attributes for animation
        speeds[index] = Math.random() * 0.5 + 0.5;
        offsets[index] = Math.random() * Math.PI * 2;
        directions[index] = Math.random() * Math.PI * 2;
        press[index] = Math.random() * 0.5 + 0.5;
        
        index++;
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aCoordinates', new THREE.BufferAttribute(coordinates, 2));
    geom.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geom.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geom.setAttribute('aDirection', new THREE.BufferAttribute(directions, 1));
    geom.setAttribute('aPress', new THREE.BufferAttribute(press, 1));
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uDisplacement: { value: displacementTextureRef.current },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uRadius: { value: 0.15 },
        uStrength: { value: 0.5 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    return { geometry: geom, material: mat, particleCount: numParticles };
  }, [texture, viewport]);
  
  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / size.width) * 2 - 1,
        y: -(e.clientY / size.height) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);
  
  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !material) return;
    
    material.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Update displacement texture based on mouse movement
    if (displacementCanvasRef.current) {
      const canvas = displacementCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Fade out previous displacement
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw new displacement at mouse position
      const mouseX = ((mouseRef.current.x + 1) / 2) * canvas.width;
      const mouseY = ((1 - mouseRef.current.y) / 2) * canvas.height;
      
      const prevMouseX = ((prevMouseRef.current.x + 1) / 2) * canvas.width;
      const prevMouseY = ((1 - prevMouseRef.current.y) / 2) * canvas.height;
      
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 1) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      prevMouseRef.current = { ...mouseRef.current };
      
      if (displacementTextureRef.current) {
        displacementTextureRef.current.needsUpdate = true;
      }
    }
  });
  
  if (!geometry || !material) return null;
  
  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function ParticleLogo() {
  return (
    <div className="relative w-full h-screen bg-n-8 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'url(/assets/gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-color-1 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-color-2 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative image - subtle */}
      <div 
        className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-10"
        style={{
          backgroundImage: 'url(/assets/roadmap/image-3.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Canvas for 3D particles */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <Particles imageUrl="/assets/circleimages/logodark-background.png" />
      </Canvas>
      
      {/* Text overlay with backdrop */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="relative">
          {/* Gradient fade for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-n-8 via-n-8/80 to-transparent h-64"></div>
          
          <div className="relative flex flex-col items-center justify-center pb-16 pt-32">
            <div className="flex flex-col items-center space-y-1">
              <span className="font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                CIRCLE UP
              </span>
              <span className="font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                VOLUNTEER
              </span>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-color-1 to-transparent"></div>
                <span className="text-base md:text-lg text-n-3 font-mono leading-tight">
                  Community Based Learning
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-color-2 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 border-2 border-color-1/10 pointer-events-none z-30"></div>
    </div>
  );
}
