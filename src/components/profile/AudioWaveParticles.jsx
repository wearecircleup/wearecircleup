import { useRef, useEffect } from 'react';

/**
 * AudioWaveParticles - Interactive audio wave visualization with particles
 * 
 * Creates 4+ layered sine waves with particle effects
 * Touch/hover interaction disperses particles like ParticleLogo
 * Electronic concert vibe with animated rhythm
 * Optimized for all screen sizes (PC, tablet, smartphone)
 */
const AudioWaveParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const wavesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Responsive sizing
    const updateSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      // Responsive height: 40vh on mobile, 500px max on desktop
      const isMobile = window.innerWidth < 768;
      canvas.height = isMobile 
        ? Math.min(window.innerHeight * 0.4, 400)
        : Math.min(window.innerHeight * 0.5, 500);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    // Create 8+ layered sine waves with varied frequencies (bi/tri-modal)
    const waves = [
      {
        amplitude: canvas.height * 0.25,
        frequency: 0.012,
        speed: 0.05,
        phase: 0,
        color: { r: 0, g: 200, b: 255 }, // Cyan
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.22,
        frequency: 0.018,
        speed: 0.045,
        phase: Math.PI / 6,
        color: { r: 100, g: 150, b: 255 }, // Light Blue
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.035
      },
      {
        amplitude: canvas.height * 0.28,
        frequency: 0.01,
        speed: 0.055,
        phase: Math.PI / 4,
        color: { r: 150, g: 100, b: 255 }, // Blue-Purple
        lineWidth: 3,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.2,
        frequency: 0.022,
        speed: 0.04,
        phase: Math.PI / 3,
        color: { r: 180, g: 80, b: 250 }, // Purple
        lineWidth: 2.5,
        bimodal: true,
        secondFrequency: 0.04,
        thirdFrequency: 0.055 // Trimodal
      },
      {
        amplitude: canvas.height * 0.24,
        frequency: 0.015,
        speed: 0.048,
        phase: Math.PI / 2,
        color: { r: 200, g: 70, b: 220 }, // Magenta
        lineWidth: 2,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.26,
        frequency: 0.013,
        speed: 0.052,
        phase: Math.PI * 0.6,
        color: { r: 220, g: 80, b: 180 }, // Pink-Purple
        lineWidth: 3,
        bimodal: true,
        secondFrequency: 0.03
      },
      {
        amplitude: canvas.height * 0.21,
        frequency: 0.02,
        speed: 0.042,
        phase: Math.PI * 0.75,
        color: { r: 236, g: 72, b: 153 }, // Pink
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.23,
        frequency: 0.016,
        speed: 0.046,
        phase: Math.PI,
        color: { r: 100, g: 220, b: 255 }, // Cyan-Blue
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.038
      }
    ];

    // Create continuous line particles for each wave
    const particleCount = Math.floor(canvas.width / 3); // More particles for smoother lines
    waves.forEach((wave) => {
      wave.particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = (canvas.width / particleCount) * i;
        wave.particles.push({
          x: x,
          baseX: x,
          y: canvas.height / 2,
          baseY: canvas.height / 2,
          vx: 0,
          vy: 0,
          mass: Math.random() * 2 + 1,
          friction: 0.88
        });
      }
    });
    
    wavesRef.current = waves;

    // Animation loop
    const animate = () => {
      // Clear completely - no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const centerY = canvas.height / 2;

      // Draw each wave layer
      waves.forEach((wave, waveIndex) => {
        wave.phase += wave.speed;

        // Calculate all positions first
        wave.particles.forEach((particle) => {
          // Calculate sine wave position (bi/tri-modal)
          let sineY;
          if (wave.thirdFrequency) {
            // Trimodal: three frequencies combined
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.3) * wave.amplitude * 0.4;
            const w3 = Math.sin(particle.baseX * wave.thirdFrequency + wave.phase * 0.7) * wave.amplitude * 0.25;
            sineY = w1 + w2 + w3;
          } else if (wave.bimodal) {
            // Bimodal: two frequencies
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.5) * wave.amplitude * 0.5;
            sineY = w1 + w2;
          } else {
            sineY = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
          }
          particle.baseY = centerY + sineY;

          // Mouse/touch interaction - disperse
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 5;
            particle.vy -= Math.sin(angle) * force * 5;
          }

          // Spring back
          const dxBase = particle.baseX - particle.x;
          const dyBase = particle.baseY - particle.y;
          particle.vx += dxBase * 0.04;
          particle.vy += dyBase * 0.04;

          // Friction
          particle.vx *= particle.friction;
          particle.vy *= particle.friction;

          // Update
          particle.x += particle.vx;
          particle.y += particle.vy;
        });

        // Draw continuous smooth line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.7)`;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.5)`;
        
        wave.particles.forEach((particle, pIndex) => {
          if (pIndex === 0) {
            ctx.moveTo(particle.x, particle.y);
          } else {
            // Smooth curve through points
            const prevParticle = wave.particles[pIndex - 1];
            const midX = (prevParticle.x + particle.x) / 2;
            const midY = (prevParticle.y + particle.y) / 2;
            ctx.quadraticCurveTo(prevParticle.x, prevParticle.y, midX, midY);
          }
        });
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse/touch interaction handlers
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

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full cursor-pointer block"
      style={{ 
        maxHeight: '450px',
        minHeight: '280px',
        touchAction: 'none',
        background: 'transparent',
        margin: 0,
        padding: 0
      }}
    />
  );
};

export default AudioWaveParticles;
