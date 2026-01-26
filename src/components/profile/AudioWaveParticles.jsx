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
    
    // Responsive sizing - full viewport width
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      // Responsive height optimized for each device
      if (isMobile) {
        canvas.height = Math.min(window.innerHeight * 0.35, 350); // Smaller on mobile
      } else if (isTablet) {
        canvas.height = Math.min(window.innerHeight * 0.45, 450);
      } else {
        canvas.height = Math.min(window.innerHeight * 0.5, 500);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    // Mobile optimization - 8 waves minimum for organic look
    const waveCount = 8;
    
    // Higher frequencies for tighter waves
    const freqMultiplier = isMobile ? 2.5 : 1;
    
    // Create layered sine waves with higher frequencies
    const allWaves = [
      {
        amplitude: canvas.height * 0.11,
        frequency: 0.012 * freqMultiplier,
        speed: 0.05,
        phase: 0,
        color: { r: 0, g: 220, b: 255 },
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.10,
        frequency: 0.018 * freqMultiplier,
        speed: 0.045,
        phase: Math.PI / 6,
        color: { r: 120, g: 170, b: 255 },
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.035 * freqMultiplier
      },
      {
        amplitude: canvas.height * 0.12,
        frequency: 0.01 * freqMultiplier,
        speed: 0.055,
        phase: Math.PI / 4,
        color: { r: 170, g: 120, b: 255 },
        lineWidth: 3,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.09,
        frequency: 0.022 * freqMultiplier,
        speed: 0.04,
        phase: Math.PI / 3,
        color: { r: 200, g: 100, b: 255 },
        lineWidth: 2.5,
        bimodal: true,
        secondFrequency: 0.04 * freqMultiplier,
        thirdFrequency: 0.055 * freqMultiplier
      },
      {
        amplitude: canvas.height * 0.10,
        frequency: 0.015 * freqMultiplier,
        speed: 0.048,
        phase: Math.PI / 2,
        color: { r: 220, g: 90, b: 240 },
        lineWidth: 2,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.11,
        frequency: 0.013 * freqMultiplier,
        speed: 0.052,
        phase: Math.PI * 0.6,
        color: { r: 240, g: 100, b: 200 },
        lineWidth: 3,
        bimodal: true,
        secondFrequency: 0.03 * freqMultiplier
      },
      {
        amplitude: canvas.height * 0.10,
        frequency: 0.02 * freqMultiplier,
        speed: 0.042,
        phase: Math.PI * 0.75,
        color: { r: 255, g: 92, b: 173 },
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.10,
        frequency: 0.016 * freqMultiplier,
        speed: 0.046,
        phase: Math.PI,
        color: { r: 120, g: 240, b: 255 },
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.038 * freqMultiplier
      }
    ];
    
    // Use only first N waves based on device
    const waves = allWaves.slice(0, waveCount);

    // Particle count - balanced for smooth curves
    const particleCount = isMobile 
      ? Math.floor(canvas.width / 5) 
      : Math.floor(canvas.width / 3);
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

    // Animation loop - simple and fast
    const animate = () => {
      // Clear completely - transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const centerY = canvas.height / 2;

      // Draw each wave layer
      waves.forEach((wave, waveIndex) => {
        wave.phase += wave.speed;

        // Calculate all positions first - NO convergence
        wave.particles.forEach((particle, pIndex) => {
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
          // Simple interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = 22500; // 150^2

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const force = (150 - dist) / 150;
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
        ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.8)`;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.6)`;
        
        // Smooth curves with simple quadratic
        if (wave.particles.length > 0) {
          ctx.moveTo(wave.particles[0].x, wave.particles[0].y);
          
          for (let i = 1; i < wave.particles.length - 1; i++) {
            const xc = (wave.particles[i].x + wave.particles[i + 1].x) / 2;
            const yc = (wave.particles[i].y + wave.particles[i + 1].y) / 2;
            ctx.quadraticCurveTo(wave.particles[i].x, wave.particles[i].y, xc, yc);
          }
          
          // Last point
          if (wave.particles.length > 1) {
            const last = wave.particles[wave.particles.length - 1];
            ctx.lineTo(last.x, last.y);
          }
        }
        
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
        minHeight: '250px',
        touchAction: 'none',
        background: 'transparent',
        margin: 0,
        padding: 0,
        // Hardware acceleration for better mobile performance
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    />
  );
};

export default AudioWaveParticles;
