import { useRef, useEffect } from 'react';

/**
 * AudioWaveParticles - Modern audio wave visualization with particles
 * 
 * Creates animated sound waves using canvas particles with gradient colors
 * Optimized for all screen sizes (PC, tablet, smartphone)
 * Full width, responsive height (max ~500px equivalent)
 */
const AudioWaveParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const barsRef = useRef([]);

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

    // Audio wave bars configuration
    const barCount = Math.floor(canvas.width / 12); // Responsive bar count
    const bars = [];
    
    // Initialize bars with random properties
    for (let i = 0; i < barCount; i++) {
      bars.push({
        x: (canvas.width / barCount) * i,
        height: Math.random() * canvas.height * 0.5,
        targetHeight: Math.random() * canvas.height * 0.5,
        speed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.02 + 0.01
      });
    }
    
    barsRef.current = bars;

    // Create gradient (cyan -> purple -> pink)
    const createGradient = (x, y, height) => {
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, '#00f5ff'); // Cyan
      gradient.addColorStop(0.5, '#a855f7'); // Purple
      gradient.addColorStop(1, '#ec4899'); // Pink
      return gradient;
    };

    // Animation loop
    const animate = () => {
      // Clear with fade effect for trail
      ctx.fillStyle = 'rgba(17, 15, 25, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      bars.forEach((bar, index) => {
        // Smooth wave motion
        bar.phase += bar.frequency;
        const wave = Math.sin(bar.phase + time) * canvas.height * 0.3;
        bar.targetHeight = Math.abs(wave) + canvas.height * 0.1;
        
        // Smooth interpolation
        bar.height += (bar.targetHeight - bar.height) * bar.speed;

        // Draw bar with gradient
        const barWidth = (canvas.width / barCount) * 0.6;
        const x = bar.x + (canvas.width / barCount) * 0.2;
        const y = centerY - bar.height / 2;

        // Main bar with gradient
        ctx.fillStyle = createGradient(x, y, bar.height);
        ctx.fillRect(x, y, barWidth, bar.height);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = index % 3 === 0 ? '#00f5ff' : index % 3 === 1 ? '#a855f7' : '#ec4899';
        ctx.fillRect(x, y, barWidth, bar.height);
        ctx.shadowBlur = 0;

        // Add particles at bar tips
        if (Math.random() > 0.7) {
          const particleY = y + (Math.random() > 0.5 ? 0 : bar.height);
          ctx.beginPath();
          ctx.arc(x + barWidth / 2, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <canvas 
        ref={canvasRef}
        className="w-full"
        style={{ 
          maxHeight: '500px',
          minHeight: '300px'
        }}
      />
    </div>
  );
};

export default AudioWaveParticles;
