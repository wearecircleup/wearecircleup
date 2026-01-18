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
      
      // Scale image to fit screen while maintaining aspect ratio - larger
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.85;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Create particles - highly optimized
      const particles = [];
      const gap = 7; // Larger gap for more separation and better performance
      
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];
          
          // Only visible pixels - exclude black background
          const brightness = (r + g + b) / 3;
          if (alpha > 50 && brightness > 30) {
            const offsetX = (Math.random() - 0.5) * 3;
            const offsetY = (Math.random() - 0.5) * 3;
            particles.push({
              x: x + (canvas.width - width) / 2 + offsetX,
              y: y + (canvas.height - height) / 2 + offsetY,
              baseX: x + (canvas.width - width) / 2 + offsetX,
              baseY: y + (canvas.height - height) / 2 + offsetY,
              r: r,
              g: g,
              b: b,
              size: Math.random() * 2 + 0.8, // Smaller variable size
              vx: 0,
              vy: 0,
              mass: Math.random() * 3 + 0.5, // Different mass for momentum
              friction: Math.random() * 0.15 + 0.8, // Variable friction
              randomAngle: Math.random() * Math.PI * 2, // Random angle for unpredictable movement
              chaos: Math.random() * 0.5 + 0.5, // Chaos factor for unpredictability
              offsetX: (Math.random() - 0.5) * 3, // Random offset for overlap
              offsetY: (Math.random() - 0.5) * 3 // Random offset for overlap
            });
          }
        }
      }
      
      particlesRef.current = particles;
      
      // Animation loop - dynamic and fluid
      const animate = () => {
        // Dark background for particles
        ctx.fillStyle = '#110f19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Mouse interaction with momentum
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            // Add chaos to make movement unpredictable
            const chaosAngle = angle + (Math.random() - 0.5) * particle.chaos;
            // Apply force based on mass (heavier = slower) - reduced speed
            particle.vx -= Math.cos(chaosAngle) * force * (3 / particle.mass);
            particle.vy -= Math.sin(chaosAngle) * force * (3 / particle.mass);
            // Add random perpendicular movement
            particle.vx += Math.cos(chaosAngle + Math.PI / 2) * (Math.random() - 0.5) * particle.chaos * 0.5;
            particle.vy += Math.sin(chaosAngle + Math.PI / 2) * (Math.random() - 0.5) * particle.chaos * 0.5;
          }
          
          // Spring back to base with momentum - slower return
          const dxBase = particle.baseX - particle.x;
          const dyBase = particle.baseY - particle.y;
          particle.vx += dxBase * 0.02;
          particle.vy += dyBase * 0.02;
          
          // Apply individual friction - more friction for slower movement
          particle.vx *= particle.friction * 0.95;
          particle.vy *= particle.friction * 0.95;
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Enhance color spectrum - more whites and darker tones
          const colorBoost = 1.3;
          const r = Math.min(255, particle.r * colorBoost);
          const g = Math.min(255, particle.g * colorBoost);
          const b = Math.min(255, particle.b * colorBoost);
          
          // Draw particle with variable opacity
          const opacity = Math.max(0.6, 1 - distance / (maxDistance * 2));
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
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#110f19' }}>
      {/* Much darker overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Background gradient - behind particles */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: 'url(/assets/gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Grid overlay - behind particles */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
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
      
      {/* Particle Canvas - Kid image as particles - above backgrounds */}
      <ParticleCanvas imageUrl="/assets/circleimages/kid.png" />
      
      {/* Text overlay - top positioned */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none pt-16">
        <div className="flex flex-col items-center space-y-3">
          <span className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            CIRCLE UP
          </span>
          <span className="font-extrabold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
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
