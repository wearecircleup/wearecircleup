import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AudioWave - Animated sound wave visualization
 * 
 * Creates a dynamic audio wave effect with gradient colors
 * Similar to music visualizers with smooth sine wave animations
 */
const AudioWave = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 200;

    // Wave parameters
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.03, phase: 0, color: '#AC6AFF' },
      { amplitude: 25, frequency: 0.025, speed: 0.025, phase: Math.PI / 3, color: '#FFC876' },
      { amplitude: 35, frequency: 0.015, speed: 0.035, phase: Math.PI / 2, color: '#D87CEE' },
      { amplitude: 20, frequency: 0.03, speed: 0.02, phase: Math.PI, color: '#9099FC' }
    ];

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(17, 15, 25, 0.1)';
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.05;

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = wave.color;

        for (let x = 0; x < width; x++) {
          // Multiple sine waves for complex pattern
          const y1 = Math.sin(x * wave.frequency + timeRef.current * wave.speed + wave.phase) * wave.amplitude;
          const y2 = Math.sin(x * wave.frequency * 1.5 + timeRef.current * wave.speed * 0.8) * (wave.amplitude * 0.5);
          const y = height / 2 + y1 + y2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }}
    >
      <div className="relative w-[400px] h-[200px] mx-auto">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-color-1/20 via-color-2/20 to-color-3/20 rounded-2xl blur-xl" />
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 rounded-2xl"
          style={{ background: 'rgba(17, 15, 25, 0.8)' }}
        />
      </div>
    </motion.div>
  );
};

export default AudioWave;
