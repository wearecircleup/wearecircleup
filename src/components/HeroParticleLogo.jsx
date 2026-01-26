import { useRef, useEffect, useState } from 'react';

// Array of images for hero particle effect
const HERO_IMAGES = [
  '/assets/circleimages/presentation/particles-1.png',
  '/assets/circleimages/presentation/particles-2.png',
  '/assets/circleimages/presentation/particles-3.png',
  '/assets/circleimages/presentation/particles-4.png'
];

function HeroParticleCanvas({ imageUrl, containerRef }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    mouseRef.current = { x: -1000, y: -1000 };
    
    // Set canvas size to match container
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
      
      // Scale image to fit container - larger size
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.95;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Create particles - higher resolution with more particles
      const particles = [];
      const gap = 4; // Smaller gap = more particles
      
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
            const baseX = x + (canvas.width - width) / 2 + offsetX;
            const baseY = y + (canvas.height - height) / 2 + offsetY;
            
            // Random starting position
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 200;
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
              size: Math.random() * 1.2 + 0.5,
              vx: 0,
              vy: 0,
              mass: Math.random() * 2 + 0.5,
              friction: Math.random() * 0.15 + 0.82,
              chaos: Math.random() * 0.4 + 0.4,
              forming: true,
              formProgress: 0
            });
          }
        }
      }
      
      particlesRef.current = particles;
      
      // Animation loop
      const animate = () => {
        ctx.fillStyle = '#110f19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          if (particle.forming) {
            particle.formProgress += 0.03;
            
            if (particle.formProgress >= 1) {
              particle.forming = false;
              particle.formProgress = 1;
            }
            
            const easeProgress = 1 - Math.pow(1 - particle.formProgress, 3);
            const dxForm = particle.baseX - particle.x;
            const dyForm = particle.baseY - particle.y;
            particle.x += dxForm * 0.15 * easeProgress;
            particle.y += dyForm * 0.15 * easeProgress;
          } else {
            // Mouse interaction
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const angle = Math.atan2(dy, dx);
              const chaosAngle = angle + (Math.random() - 0.5) * particle.chaos;
              particle.vx -= Math.cos(chaosAngle) * force * (2.5 / particle.mass);
              particle.vy -= Math.sin(chaosAngle) * force * (2.5 / particle.mass);
            }
            
            // Spring back
            const dxBase = particle.baseX - particle.x;
            const dyBase = particle.baseY - particle.y;
            particle.vx += dxBase * 0.02;
            particle.vy += dyBase * 0.02;
            
            particle.vx *= particle.friction * 0.95;
            particle.vy *= particle.friction * 0.95;
          }
          
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Enhanced colors
          const colorBoost = 1.3;
          const r = Math.min(255, particle.r * colorBoost);
          const g = Math.min(255, particle.g * colorBoost);
          const b = Math.min(255, particle.b * colorBoost);
          
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0.6, 1 - distance / 200);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    img.src = imageUrl;
    
    // Mouse handlers relative to canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageUrl, containerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10" style={{ touchAction: 'none' }} />;
}

export default function HeroParticleLogo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer rounded-2xl" 
      style={{ backgroundColor: '#110f19', minHeight: '600px' }}
      onClick={handleClick}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20 z-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-color-1 rounded-full blur-3xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-color-5 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Particle Canvas */}
      <HeroParticleCanvas imageUrl={HERO_IMAGES[currentImageIndex]} containerRef={containerRef} />
      
      {/* Subtle border */}
      <div className="absolute inset-0 border border-n-6/30 rounded-2xl pointer-events-none z-30"></div>
      
      {/* Click indicator */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="text-xs text-n-4 font-light tracking-wider opacity-60">
          Click para cambiar
        </div>
      </div>
    </div>
  );
}
