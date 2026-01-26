import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Button from '../Button';

/**
 * ProfileCreationCTA - Spotify-style Call-to-Action
 * 
 * Displayed when user doesn't have a profile yet.
 * Full-screen centered layout with gradient button and decorative elements.
 */
const ProfileCreationCTA = ({ onStart }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const wavesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      // Calculate height based on wave amplitude
      // Max amplitude is 0.12 of height, so we need enough space for waves to oscillate
      // Total height = center space + (max amplitude * 2 for top/bottom) + padding
      const maxAmplitude = 0.12;
      const amplitudeSpace = maxAmplitude * 2;
      const paddingFactor = 1.5; // Extra space for smooth wave movement
      
      // Base height calculation: enough for waves to move freely
      const baseHeight = 200; // Minimum comfortable height for wave visualization
      const calculatedHeight = baseHeight * (1 + amplitudeSpace) * paddingFactor;
      
      canvas.height = calculatedHeight;
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    const waveCount = 8;
    const freqMultiplier = isMobile ? 2.5 : 1;
    
    const allWaves = [
      { amplitude: canvas.height * 0.11, frequency: 0.012 * freqMultiplier, speed: 0.05, phase: 0, color: { r: 0, g: 220, b: 255 }, lineWidth: 2.5, bimodal: false },
      { amplitude: canvas.height * 0.10, frequency: 0.018 * freqMultiplier, speed: 0.045, phase: Math.PI / 6, color: { r: 120, g: 170, b: 255 }, lineWidth: 2, bimodal: true, secondFrequency: 0.035 * freqMultiplier },
      { amplitude: canvas.height * 0.12, frequency: 0.01 * freqMultiplier, speed: 0.055, phase: Math.PI / 4, color: { r: 170, g: 120, b: 255 }, lineWidth: 3, bimodal: false },
      { amplitude: canvas.height * 0.09, frequency: 0.022 * freqMultiplier, speed: 0.04, phase: Math.PI / 3, color: { r: 200, g: 100, b: 255 }, lineWidth: 2.5, bimodal: true, secondFrequency: 0.04 * freqMultiplier, thirdFrequency: 0.055 * freqMultiplier },
      { amplitude: canvas.height * 0.10, frequency: 0.015 * freqMultiplier, speed: 0.048, phase: Math.PI / 2, color: { r: 220, g: 90, b: 240 }, lineWidth: 2, bimodal: false },
      { amplitude: canvas.height * 0.11, frequency: 0.013 * freqMultiplier, speed: 0.052, phase: Math.PI * 0.6, color: { r: 240, g: 100, b: 200 }, lineWidth: 3, bimodal: true, secondFrequency: 0.03 * freqMultiplier },
      { amplitude: canvas.height * 0.10, frequency: 0.02 * freqMultiplier, speed: 0.042, phase: Math.PI * 0.75, color: { r: 255, g: 92, b: 173 }, lineWidth: 2.5, bimodal: false },
      { amplitude: canvas.height * 0.10, frequency: 0.016 * freqMultiplier, speed: 0.046, phase: Math.PI, color: { r: 120, g: 240, b: 255 }, lineWidth: 2, bimodal: true, secondFrequency: 0.038 * freqMultiplier }
    ];
    
    const waves = allWaves.slice(0, waveCount);
    const particleCount = isMobile ? Math.floor(canvas.width / 5) : Math.floor(canvas.width / 3);
    
    waves.forEach((wave) => {
      wave.particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = (canvas.width / particleCount) * i;
        wave.particles.push({ x, baseX: x, y: canvas.height / 2, baseY: canvas.height / 2, vx: 0, vy: 0, mass: Math.random() * 2 + 1, friction: 0.88 });
      }
    });
    
    wavesRef.current = waves;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerY = canvas.height / 2;

      waves.forEach((wave) => {
        wave.phase += wave.speed;

        wave.particles.forEach((particle) => {
          let sineY;
          if (wave.thirdFrequency) {
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.3) * wave.amplitude * 0.4;
            const w3 = Math.sin(particle.baseX * wave.thirdFrequency + wave.phase * 0.7) * wave.amplitude * 0.25;
            sineY = w1 + w2 + w3;
          } else if (wave.bimodal) {
            const w1 = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
            const w2 = Math.sin(particle.baseX * wave.secondFrequency + wave.phase * 1.5) * wave.amplitude * 0.5;
            sineY = w1 + w2;
          } else {
            sineY = Math.sin(particle.baseX * wave.frequency + wave.phase) * wave.amplitude;
          }
          particle.baseY = centerY + sineY;

          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 22500) {
            const dist = Math.sqrt(distSq);
            const force = (150 - dist) / 150;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 5;
            particle.vy -= Math.sin(angle) * force * 5;
          }

          const dxBase = particle.baseX - particle.x;
          const dyBase = particle.baseY - particle.y;
          particle.vx += dxBase * 0.04;
          particle.vy += dyBase * 0.04;
          particle.vx *= particle.friction;
          particle.vy *= particle.friction;
          particle.x += particle.vx;
          particle.y += particle.vy;
        });

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.8)`;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0.6)`;
        
        if (wave.particles.length > 0) {
          ctx.moveTo(wave.particles[0].x, wave.particles[0].y);
          for (let i = 1; i < wave.particles.length - 1; i++) {
            const xc = (wave.particles[i].x + wave.particles[i + 1].x) / 2;
            const yc = (wave.particles[i].y + wave.particles[i + 1].y) / 2;
            ctx.quadraticCurveTo(wave.particles[i].x, wave.particles[i].y, xc, yc);
          }
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

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden px-4 py-12">

      {/* Main content */}
      <motion.div
        className="relative text-center w-full -mt-[15vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome message - Spotify style */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-2xl lg:text-3xl font-semibold text-n-1 mb-4">
              Tu comunidad. Tu aprendizaje.
            </p>
            <p className="text-lg lg:text-xl text-n-3 leading-relaxed">
              Descubre cómo crear presentaciones que inspiran. Aprende junto a personas increíbles en cafés, bibliotecas, espacios que cobran vida. 
              <span className="text-n-2 font-medium"> Cada encuentro es una oportunidad de crecer.</span>
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <Button onClick={onStart} white className="text-base lg:text-lg px-8 py-4">
            <span className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Crear Perfil
            </span>
          </Button>
        </motion.div>

        {/* Info text */}
        <motion.p
          className="text-sm text-n-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Menos de 1 minuto • Información segura y privada
        </motion.p>

        {/* Audio Wave Particles - Footer style */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
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
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCreationCTA;
