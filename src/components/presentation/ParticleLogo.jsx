import { useRef, useEffect, useState } from 'react';

// Array of images in presentation folder
const PRESENTATION_IMAGES = [
  '/assets/circleimages/presentation/hug.png',
  '/assets/circleimages/presentation/kid.png',
  '/assets/circleimages/presentation/power.png'
];

function ParticleCanvas({ imageUrl }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Initialize far off-screen
  const animationRef = useRef(null);
  const isFormingRef = useRef(true); // Track if particles are still forming

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
      
      // Scale image to fit screen while maintaining aspect ratio - larger, especially on mobile
      const isMobile = window.innerWidth < 768;
      const scaleFactor = isMobile ? 1.0 : 0.95;
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * scaleFactor;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Create particles - optimized for mobile and desktop
      const particles = [];
      const gap = isMobile ? 6 : 7; // Smaller gap on mobile for better quality
      
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
            const baseX = x + (canvas.width - width) / 2 + offsetX;
            const baseY = y + (canvas.height - height) / 2 + offsetY;
            
            // Random starting position from all directions
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 800 + 400;
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
              size: Math.random() * 2 + 0.8,
              vx: 0,
              vy: 0,
              mass: Math.random() * 3 + 0.5,
              friction: Math.random() * 0.15 + 0.8,
              randomAngle: Math.random() * Math.PI * 2,
              chaos: Math.random() * 0.5 + 0.5,
              forming: true, // Flag for initial formation
              formProgress: 0 // Progress of formation (0 to 1)
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
        
        let allFormed = true;
        
        particles.forEach(particle => {
          // Initial formation animation
          if (particle.forming) {
            allFormed = false;
            particle.formProgress += 0.012; // Faster formation speed
            
            if (particle.formProgress >= 1) {
              particle.forming = false;
              particle.formProgress = 1;
            }
            
            // Ease-out animation
            const easeProgress = 1 - Math.pow(1 - particle.formProgress, 3);
            const dxForm = particle.baseX - particle.x;
            const dyForm = particle.baseY - particle.y;
            particle.x += dxForm * 0.07 * easeProgress;
            particle.y += dyForm * 0.07 * easeProgress;
          } else {
            // Normal mouse interaction after formation - only if user has interacted
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 120;
            
            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const angle = Math.atan2(dy, dx);
              const chaosAngle = angle + (Math.random() - 0.5) * particle.chaos;
              particle.vx -= Math.cos(chaosAngle) * force * (3 / particle.mass);
              particle.vy -= Math.sin(chaosAngle) * force * (3 / particle.mass);
              particle.vx += Math.cos(chaosAngle + Math.PI / 2) * (Math.random() - 0.5) * particle.chaos * 0.5;
              particle.vy += Math.sin(chaosAngle + Math.PI / 2) * (Math.random() - 0.5) * particle.chaos * 0.5;
            }
            
            // Spring back to base
            const dxBase = particle.baseX - particle.x;
            const dyBase = particle.baseY - particle.y;
            particle.vx += dxBase * 0.02;
            particle.vy += dyBase * 0.02;
            
            // Apply friction
            particle.vx *= particle.friction * 0.95;
            particle.vy *= particle.friction * 0.95;
          }
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Enhance color spectrum - more whites and darker tones
          const colorBoost = 1.3;
          const r = Math.min(255, particle.r * colorBoost);
          const g = Math.min(255, particle.g * colorBoost);
          const b = Math.min(255, particle.b * colorBoost);
          
          // Calculate opacity based on mouse distance
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;
          const opacity = Math.max(0.6, 1 - distance / (maxDistance * 2));
          
          // Draw particle
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
    
    // Mouse move handler - only update if formation is complete
    const handleMouseMove = (e) => {
      if (!isFormingRef.current) {
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY
        };
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Touch support for mobile - only update if formation is complete
    const handleTouchMove = (e) => {
      if (!isFormingRef.current && e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    
    const handleTouchStart = (e) => {
      if (!isFormingRef.current && e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-5" style={{ touchAction: 'none' }} />;
}

export default function ParticleLogo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % PRESENTATION_IMAGES.length);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden cursor-pointer" 
      style={{ backgroundColor: '#110f19' }}
      onClick={handleClick}
    >
      {/* Much darker overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Background gradient - behind particles - very subtle on sides */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%), url(/assets/gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08
        }}
      />
      
      {/* Grid overlay - over particles */}
      <div 
        className="absolute inset-0 opacity-20 z-10 pointer-events-none"
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
      
      {/* Particle Canvas - Dynamic image as particles - above backgrounds */}
      <ParticleCanvas imageUrl={PRESENTATION_IMAGES[currentImageIndex]} />
      
      {/* Text overlay - positioned above carousel pagination */}
      <div className="absolute bottom-16 left-0 right-0 z-20 pointer-events-none mb-2">
        <div className="flex flex-col items-center space-y-1">
          <span className="font-thin text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            CIRCLE UP
          </span>
          <span className="font-extrabold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            VOLUNTEER
          </span>
          <span className="text-xl md:text-2xl text-white font-mono leading-tight mt-2 tracking-wider">
            Community Based Learning
          </span>
        </div>
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 border-2 border-color-1/10 pointer-events-none z-30"></div>
    </div>
  );
}
