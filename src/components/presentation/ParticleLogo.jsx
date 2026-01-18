import { useRef, useEffect } from 'react';

function ParticleCanvas({ imageUrl }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    img.onload = () => {
      // Create temporary canvas to read pixels
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Scale image to fit screen while maintaining aspect ratio - almost full viewport
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Create particles - optimized for performance
      const particles = [];
      const gap = 3; // Balance between detail and performance
      
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];
          
          // Only visible pixels - exclude black background
          const brightness = (r + g + b) / 3;
          if (alpha > 50 && brightness > 20) {
            particles.push({
              x: x + (canvas.width - width) / 2,
              y: y + (canvas.height - height) / 2,
              baseX: x + (canvas.width - width) / 2,
              baseY: y + (canvas.height - height) / 2,
              r: r,
              g: g,
              b: b,
              size: 2.5,
              vx: 0,
              vy: 0,
              ease: 0.2
            });
          }
        }
      }
      
      particlesRef.current = particles;
      
      // Animation loop - smooth natural movement
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Calculate distance from mouse
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          // Mouse repulsion with smooth easing
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const repelX = Math.cos(angle) * force * 8;
            const repelY = Math.sin(angle) * force * 8;
            
            particle.vx -= repelX;
            particle.vy -= repelY;
          }
          
          // Spring back to original position
          const dxBase = particle.baseX - particle.x;
          const dyBase = particle.baseY - particle.y;
          
          particle.vx += dxBase * 0.05;
          particle.vy += dyBase * 0.05;
          
          // Apply friction
          particle.vx *= 0.85;
          particle.vy *= 0.85;
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Draw particle with subtle glow
          const alpha = Math.min(1, Math.max(0.6, 1 - distance / maxDistance));
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${particle.r}, ${particle.g}, ${particle.b}, 0.3)`;
          ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    img.src = imageUrl;
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10" />;
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
      
      {/* Particle Canvas - Kid image as particles */}
      <ParticleCanvas imageUrl="/assets/circleimages/kid.png" />
      
      {/* Text overlay - top positioned */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none pt-16">
        <div className="flex flex-col items-center space-y-3">
          <span className="font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            CIRCLE UP
          </span>
          <span className="font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            VOLUNTEER
          </span>
          <span className="text-xl md:text-2xl text-n-2 font-mono leading-tight mt-4">
            Community Based Learning
          </span>
        </div>
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 border-2 border-color-1/10 pointer-events-none z-30"></div>
    </div>
  );
}
