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

    // Optimize wave count for mobile performance
    const waveCount = isMobile ? 5 : 8; // Fewer waves on mobile
    
    // Create layered sine waves with reduced amplitude and varied frequencies
    const allWaves = [
      {
        amplitude: canvas.height * 0.15,
        frequency: 0.012,
        speed: 0.05,
        phase: 0,
        color: { r: 0, g: 200, b: 255 }, // Cyan
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.13,
        frequency: 0.018,
        speed: 0.045,
        phase: Math.PI / 6,
        color: { r: 100, g: 150, b: 255 }, // Light Blue
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.035
      },
      {
        amplitude: canvas.height * 0.17,
        frequency: 0.01,
        speed: 0.055,
        phase: Math.PI / 4,
        color: { r: 150, g: 100, b: 255 }, // Blue-Purple
        lineWidth: 3,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.12,
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
        amplitude: canvas.height * 0.14,
        frequency: 0.015,
        speed: 0.048,
        phase: Math.PI / 2,
        color: { r: 200, g: 70, b: 220 }, // Magenta
        lineWidth: 2,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.16,
        frequency: 0.013,
        speed: 0.052,
        phase: Math.PI * 0.6,
        color: { r: 220, g: 80, b: 180 }, // Pink-Purple
        lineWidth: 3,
        bimodal: true,
        secondFrequency: 0.03
      },
      {
        amplitude: canvas.height * 0.13,
        frequency: 0.02,
        speed: 0.042,
        phase: Math.PI * 0.75,
        color: { r: 236, g: 72, b: 153 }, // Pink
        lineWidth: 2.5,
        bimodal: false
      },
      {
        amplitude: canvas.height * 0.14,
        frequency: 0.016,
        speed: 0.046,
        phase: Math.PI,
        color: { r: 100, g: 220, b: 255 }, // Cyan-Blue
        lineWidth: 2,
        bimodal: true,
        secondFrequency: 0.038
      }
    ];
    
    // Use only first N waves based on device
    const waves = allWaves.slice(0, waveCount);

    // Create continuous line particles - optimized per device
    let particleCount;
    if (isMobile) {
      particleCount = Math.floor(canvas.width / 6); // Fewer particles on mobile for speed
    } else if (isTablet) {
      particleCount = Math.floor(canvas.width / 4);
    } else {
      particleCount = Math.floor(canvas.width / 3); // More particles on desktop
    }
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
          friction: isMobile ? 0.9 : 0.88 // Higher friction on mobile for stability
        });
      }
    });
    
    wavesRef.current = waves;

    // Animation loop with mobile optimization
    let lastFrameTime = Date.now();
    const targetFPS = isMobile ? 45 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastFrameTime;
      
      // Throttle animation on mobile for better performance
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = now - (elapsed % frameInterval);
      
      // Clear completely - no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = now * 0.001;
      const centerY = canvas.height / 2;

      // Draw each wave layer
      waves.forEach((wave, waveIndex) => {
        wave.phase += wave.speed;

        // Calculate all positions first
        wave.particles.forEach((particle, pIndex) => {
          // Convergence: all waves meet at single point at edges (like cable wires)
          const normalizedX = particle.baseX / canvas.width; // 0 to 1
          
          // Exponential convergence for sharp cable-like effect
          // Simplified calculation on mobile
          let convergenceFactor;
          const edgeThreshold = isMobile ? 0.12 : 0.15; // Faster convergence on mobile
          
          if (normalizedX < edgeThreshold) {
            convergenceFactor = Math.pow(normalizedX / edgeThreshold, 2);
          } else if (normalizedX > (1 - edgeThreshold)) {
            convergenceFactor = Math.pow((1 - normalizedX) / edgeThreshold, 2);
          } else {
            convergenceFactor = 1;
          }
          
          // Calculate sine wave position (bi/tri-modal)
          let sineY;
          if (wave.thirdFrequency) {
            // Trimodal: three frequencies combined
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.3) * wave.amplitude * 0.4;
            const w3 = Math.sin(particle.baseX * wave.thirdFrequency + wave.phase * 0.7) * wave.amplitude * 0.25;
            sineY = (w1 + w2 + w3) * convergenceFactor;
          } else if (wave.bimodal) {
            // Bimodal: two frequencies
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.5) * wave.amplitude * 0.5;
            sineY = (w1 + w2) * convergenceFactor;
          } else {
            sineY = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude * convergenceFactor;
          }
          particle.baseY = centerY + sineY;

          // Mouse/touch interaction - disperse
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = isMobile ? 120 : 150; // Smaller interaction radius on mobile

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const forceMultiplier = isMobile ? 4 : 5; // Gentler force on mobile
            particle.vx -= Math.cos(angle) * force * forceMultiplier;
            particle.vy -= Math.sin(angle) * force * forceMultiplier;
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

        // Draw continuous smooth line with mobile optimization
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.7)`;
        ctx.lineWidth = isMobile ? wave.lineWidth * 0.8 : wave.lineWidth; // Thinner lines on mobile
        const shadowBlur = isMobile ? 10 : 15; // Less blur on mobile for performance
        ctx.shadowBlur = shadowBlur;
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
