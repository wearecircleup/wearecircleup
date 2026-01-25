import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../Button';
import AudioWave from './AudioWave';

/**
 * ProfileCreationCTA - Spotify-style Call-to-Action
 * 
 * Displayed when user doesn't have a profile yet.
 * Full-screen centered layout with gradient button and decorative elements.
 */
const ProfileCreationCTA = ({ onStart, onSkip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8 relative overflow-hidden px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-color-1/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-color-2/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Audio Wave Animation */}
        <AudioWave className="mb-8" />

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-n-1 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ¡Bienvenido a Circle Up!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-n-3 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Para comenzar a crear presentaciones increíbles con IA, necesitamos conocerte un poco mejor.
        </motion.p>

        {/* CTA Button - Using Button component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Button onClick={onStart} white className="text-sm lg:text-base">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Crear Perfil
            </span>
          </Button>
        </motion.div>

        {/* Info text */}
        <motion.p
          className="mt-6 text-sm text-n-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Menos de 1 minuto • Información segura y privada
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              ),
              title: "Seguro y Privado",
              description: "Tus datos están protegidos y nunca se comparten"
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
              title: "Rápido y Fácil",
              description: "Proceso simple para comenzar"
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
              title: "Personalizado",
              description: "Experiencia adaptada a tu perfil educativo"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-n-7/50 backdrop-blur-sm border border-n-6 hover:border-color-1/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-color-1/20 to-color-2/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-color-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-base font-semibold text-n-1 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-n-3">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileCreationCTA;
