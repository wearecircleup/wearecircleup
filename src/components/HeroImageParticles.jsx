import { useRef, useEffect, useState } from 'react';

// Array of images for hero particle effect
const HERO_IMAGES = [
  '/assets/circleimages/presentation/particles-1.png',
  '/assets/circleimages/presentation/particles-2.png',
  '/assets/circleimages/presentation/particles-3.png',
  '/assets/circleimages/presentation/particles-4.png'
];

function HeroImageParticleCanvas({ imageUrl, containerRef, exploding }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animationRef = useRef(null);
  const explodeRef = useRef(false);
  const previousImageRef = useRef(null);
  const transitionProgressRef = useRef(1);

  useEffect(() => {
    explodeRef.current = exploding;
  }, [exploding]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    mouseRef.current = { x: -1000, y: -1000, active: false };
    
    // Set canvas size to container (not viewport)
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Get container position for centering
      const rect = container.getBoundingClientRect();
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;
      
      // Scale image to fit container - show full image naturally
      const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.95;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Check if this is an image change (not first load)
      const isImageChange = previousImageRef.current !== null && previousImageRef.current !== imageUrl;
      if (isImageChange) {
        transitionProgressRef.current = 0; // Start transition
      } else if (previousImageRef.current === null) {
        transitionProgressRef.current = 1; // First load, no transition
      }
      previousImageRef.current = imageUrl;
      
      // Update or create particles
      const existingParticles = particlesRef.current;
      const particles = [];
      const gap = 3;
      let particleIndex = 0;
      
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];
          
          const brightness = (r + g + b) / 3;
          if (alpha > 50 && brightness > 30) {
            const offsetX = (Math.random() - 0.5) * 2;
            const offsetY = (Math.random() - 0.5) * 2;
            const baseX = rect.width / 2 - width / 2 + x + offsetX;
            const baseY = rect.height / 2 - height / 2 + y + offsetY;
            
            // Reuse existing particle if available (for smooth color transition)
            const existingParticle = existingParticles[particleIndex];
            
            if (existingParticle && isImageChange) {
              // Keep position, update target colors
              particles.push({
                ...existingParticle,
                targetR: r,
                targetG: g,
                targetB: b,
                baseX: baseX,
                baseY: baseY
              });
            } else if (existingParticle) {
              // Keep everything for same image
              particles.push(existingParticle);
            } else {
              // New particle (first load)
              const angle = Math.random() * Math.PI * 2;
              const distance = Math.random() * 500 + 300;
              const startX = baseX + Math.cos(angle) * distance;
              const startY = baseY + Math.sin(angle) * distance;
              
              particles.push({
                x: startX,
                y: startY,
                baseX: baseX,
                baseY: baseY,
                r: r,
                g: g,
                b: b,
                targetR: r,
                targetG: g,
                targetB: b,
                size: Math.random() * 1.5 + 0.8,
                vx: 0,
                vy: 0,
                mass: Math.random() * 2 + 0.5,
                friction: Math.random() * 0.15 + 0.82,
                chaos: Math.random() * 0.5 + 0.3,
                forming: true,
                formProgress: 0,
                explodeVx: (Math.random() - 0.5) * 40,
                explodeVy: (Math.random() - 0.5) * 40,
                exploding: false
              });
            }
            particleIndex++;
          }
        }
      }
      
      particlesRef.current = particles;
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update transition progress for color changes - smooth professional easing
        if (transitionProgressRef.current < 1) {
          transitionProgressRef.current += 0.015; // Slower, smoother transition (~67 frames = ~1.1 seconds)
        }
        
        particles.forEach(particle => {
          // Smooth color transition with easing
          if (particle.targetR !== undefined && transitionProgressRef.current < 1) {
            // Ease-in-out cubic for professional smooth transition
            const t = transitionProgressRef.current;
            const easeProgress = t < 0.5 
              ? 4 * t * t * t 
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
            const lerpSpeed = 0.15;
            particle.r = particle.r + (particle.targetR - particle.r) * easeProgress * lerpSpeed;
            particle.g = particle.g + (particle.targetG - particle.g) * easeProgress * lerpSpeed;
            particle.b = particle.b + (particle.targetB - particle.b) * easeProgress * lerpSpeed;
          }
          
          if (explodeRef.current && !particle.exploding) {
            // Start explosion
            particle.exploding = true;
            particle.forming = false;
            particle.vx = particle.explodeVx;
            particle.vy = particle.explodeVy;
          }
          
          if (particle.exploding) {
            // Explosion physics - use viewport coordinates
            const rect = container.getBoundingClientRect();
            const viewportX = rect.left + particle.x;
            const viewportY = rect.top + particle.y;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.vy += 0.3; // Gravity
            
            // Check if particle is off viewport - reset to form
            if (viewportX < -100 || viewportX > window.innerWidth + 100 || 
                viewportY < -100 || viewportY > window.innerHeight + 100) {
              particle.exploding = false;
              particle.forming = true;
              particle.formProgress = 0;
              
              // New random start position
              const angle = Math.random() * Math.PI * 2;
              const distance = Math.random() * 500 + 300;
              particle.x = particle.baseX + Math.cos(angle) * distance;
              particle.y = particle.baseY + Math.sin(angle) * distance;
              particle.vx = 0;
              particle.vy = 0;
            }
          } else if (particle.forming) {
            particle.formProgress += 0.05;
            
            if (particle.formProgress >= 1) {
              particle.forming = false;
              particle.formProgress = 1;
            }
            
            const easeProgress = 1 - Math.pow(1 - particle.formProgress, 3);
            const dxForm = particle.baseX - particle.x;
            const dyForm = particle.baseY - particle.y;
            particle.x += dxForm * 0.25 * easeProgress;
            particle.y += dyForm * 0.25 * easeProgress;
          } else {
            // Mouse interaction - only when active (hover) - GENTLE movement
            if (mouseRef.current.active) {
              const dx = mouseRef.current.x - particle.x;
              const dy = mouseRef.current.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const maxDistance = 100;
              
              if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                const chaosAngle = angle + (Math.random() - 0.5) * particle.chaos;
                // Reduced force for gentle hover effect
                particle.vx -= Math.cos(chaosAngle) * force * (1.2 / particle.mass);
                particle.vy -= Math.sin(chaosAngle) * force * (1.2 / particle.mass);
              }
            }
            
            // Spring back to base position
            const dxBase = particle.baseX - particle.x;
            const dyBase = particle.baseY - particle.y;
            particle.vx += dxBase * 0.08;
            particle.vy += dyBase * 0.08;
            
            particle.vx *= particle.friction * 0.88;
            particle.vy *= particle.friction * 0.88;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
          }
          
          // Enhanced colors
          const colorBoost = 1.4;
          const r = Math.min(255, particle.r * colorBoost);
          const g = Math.min(255, particle.g * colorBoost);
          const b = Math.min(255, particle.b * colorBoost);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    img.src = imageUrl;
    
    // Mouse/touch handlers - only for hover effect
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                       e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isInside) {
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY,
          active: true
        };
      } else {
        mouseRef.current = { x: -1000, y: -1000, active: false };
      }
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const isInside = touch.clientX >= rect.left && touch.clientX <= rect.right && 
                         touch.clientY >= rect.top && touch.clientY <= rect.bottom;
        
        if (isInside) {
          mouseRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            active: true
          };
        } else {
          mouseRef.current = { x: -1000, y: -1000, active: false };
        }
      }
    };
    
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageUrl, containerRef]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-10" 
      style={{ touchAction: 'none' }} 
    />
  );
}

export default function HeroImageParticles() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [exploding, setExploding] = useState(false);
  const containerRef = useRef(null);

  const handleClick = (e) => {
    // Click changes image instead of exploding
    if (e.target === containerRef.current || containerRef.current.contains(e.target)) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-visible cursor-pointer" 
      style={{ minHeight: '400px' }}
      onClick={handleClick}
    >
      {/* Particle Canvas - fixed position for viewport explosion */}
      <HeroImageParticleCanvas 
        imageUrl={HERO_IMAGES[currentImageIndex]} 
        containerRef={containerRef}
        exploding={exploding}
      />
      
      {/* Click indicator */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="text-xs text-n-4 font-light tracking-wider opacity-60">
          Click para cambiar
        </div>
      </div>
    </div>
  );
}
