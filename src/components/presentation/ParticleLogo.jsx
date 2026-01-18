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
      
      // Scale image to fit screen while maintaining aspect ratio - larger for visibility
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.5;
      const width = Math.floor(img.width * scale);
      const height = Math.floor(img.height * scale);
      
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      console.log('Particles loading:', { width, height, totalPixels: width * height });
      
      // Create particles from non-transparent and non-black pixels
      const particles = [];
      const gap = 2; // Sample every 2 pixels for better detail
      
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];
          
          // Only visible pixels that are NOT black (exclude background)
          const brightness = (r + g + b) / 3;
          if (alpha > 128 && brightness > 30) {
            particles.push({
              x: x + (canvas.width - width) / 2,
              y: y + (canvas.height - height) / 2 - 50, // Move logo up
              baseX: x + (canvas.width - width) / 2,
              baseY: y + (canvas.height - height) / 2 - 50,
              r: r,
              g: g,
              b: b,
              size: Math.random() * 3 + 2,
              speedX: Math.random() * 0.5 - 0.25,
              speedY: Math.random() * 0.5 - 0.25,
              density: Math.random() * 30 + 30
            });
          }
        }
      }
      
      console.log('Total particles created:', particles.length);
      particlesRef.current = particles;
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = 100;
          const force = (maxDistance - distance) / maxDistance;
          
          if (distance < maxDistance) {
            const directionX = forceDirectionX * force * particle.density;
            const directionY = forceDirectionY * force * particle.density;
            particle.x -= directionX;
            particle.y -= directionY;
          } else {
            // Return to base position
            if (particle.x !== particle.baseX) {
              const dx = particle.x - particle.baseX;
              particle.x -= dx / 10;
            }
            if (particle.y !== particle.baseY) {
              const dy = particle.y - particle.baseY;
              particle.y -= dy / 10;
            }
          }
          
          // Draw particle with glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${particle.r}, ${particle.g}, ${particle.b}, 0.5)`;
          ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, 0.9)`;
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
      
      {/* Particle Canvas - Logo as particles */}
      <ParticleCanvas imageUrl="/assets/circleimages/logodark-background.png" />
      
      {/* Text overlay with backdrop */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="relative">
          {/* Gradient fade for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-n-8 via-n-8/80 to-transparent h-64"></div>
          
          <div className="relative flex flex-col items-center justify-center pb-24 pt-32">
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
        </div>
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 border-2 border-color-1/10 pointer-events-none z-30"></div>
    </div>
  );
}
