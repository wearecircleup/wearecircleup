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

    // Create 5 layered sine waves with different frequencies (some bimodal)
    const waves = [
      {
        amplitude: canvas.height * 0.2,
        frequency: 0.015,
        speed: 0.04,
        phase: 0,
        color: { r: 0, g: 245, b: 255 }, // Cyan
        particles: [],
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.15,
        frequency: 0.025,
        speed: 0.03,
        phase: Math.PI / 4,
        color: { r: 168, g: 85, b: 247 }, // Purple
        particles: [],
        bimodal: true, // Bimodal wave
        secondFrequency: 0.04
      },
      {
        amplitude: canvas.height * 0.22,
        frequency: 0.012,
        speed: 0.045,
        phase: Math.PI / 2,
        color: { r: 236, g: 72, b: 153 }, // Pink
        particles: [],
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.18,
        frequency: 0.02,
        speed: 0.035,
        phase: Math.PI * 0.75,
        color: { r: 139, g: 92, b: 246 }, // Violet
        particles: [],
        bimodal: true, // Bimodal wave
        secondFrequency: 0.035
      },
      {
        amplitude: canvas.height * 0.16,
        frequency: 0.018,
        speed: 0.038,
        phase: Math.PI,
        color: { r: 100, g: 200, b: 255 }, // Light blue
        particles: [],
        bimodal: false
      }
    ];

    // Create particles for each wave
    const particleCount = Math.floor(canvas.width / 8);
    waves.forEach((wave) => {
      for (let i = 0; i < particleCount; i++) {
        const x = (canvas.width / particleCount) * i;
        wave.particles.push({
          x: x,
          baseX: x,
          y: canvas.height / 2,
          baseY: canvas.height / 2,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 1,
          mass: Math.random() * 2 + 1,
          friction: 0.85
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

        wave.particles.forEach((particle, pIndex) => {
          // Calculate sine wave position (bimodal if specified)
          let sineY;
          if (wave.bimodal) {
            // Bimodal: combination of two frequencies
            const wave1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const wave2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.5) * wave.amplitude * 0.5;
            sineY = wave1 + wave2;
          } else {
            sineY = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
          }
          particle.baseY = centerY + sineY;

          // Mouse/touch interaction - disperse particles
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 4;
            particle.vy -= Math.sin(angle) * force * 4;
          }

          // Spring back to wave position
          const dxBase = particle.baseX - particle.x;
          const dyBase = particle.baseY - particle.y;
          particle.vx += dxBase * 0.03;
          particle.vy += dyBase * 0.03;

          // Apply friction
          particle.vx *= particle.friction;
          particle.vy *= particle.friction;

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Calculate opacity based on distance from mouse
          const opacity = distance < maxDistance * 2 
            ? Math.max(0.3, 1 - distance / (maxDistance * 2))
            : 0.8;

          // Draw particle with glow
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${opacity})`;
          ctx.fillStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect particles with smooth lines for continuous wave
          if (pIndex > 0) {
            const prevParticle = wave.particles[pIndex - 1];
            ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${opacity * 0.4})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(prevParticle.x, prevParticle.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
          }
        });
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
        maxHeight: '500px',
        minHeight: '300px',
        touchAction: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default AudioWaveParticles;
