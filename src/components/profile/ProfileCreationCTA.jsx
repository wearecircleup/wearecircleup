import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ProfileCreationCTA - Spotify-style Call-to-Action
 * 
 * Displayed when user doesn't have a profile yet.
 * Full-screen centered layout with gradient button and decorative elements.
 */
const ProfileCreationCTA = ({ onStart, onSkip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8 relative overflow-hidden">
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
        {/* Icon */}
        <motion.div
          className="mb-8 inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center shadow-lg shadow-color-1/50">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
        </motion.div>

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
          <button
            onClick={onStart}
            className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8 text-sm lg:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Crear Perfil
            </span>
            <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="btn-left" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#89F9E8" />
                  <stop offset="100%" stopColor="#FACB7B" />
                </linearGradient>
                <linearGradient id="btn-top" x1="100%" x2="0%" y1="50%" y2="50%">
                  <stop offset="0%" stopColor="#D87CEE" />
                  <stop offset="100%" stopColor="rgba(88, 88, 88, 0)" />
                </linearGradient>
                <linearGradient id="btn-bottom" x1="100%" x2="0%" y1="50%" y2="50%">
                  <stop offset="0%" stopColor="#9099FC" />
                  <stop offset="100%" stopColor="rgba(88, 88, 88, 0)" />
                </linearGradient>
                <linearGradient id="btn-right" x1="14.635%" x2="14.635%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#9099FC" />
                  <stop offset="100%" stopColor="#D87CEE" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#btn-left)" rx="1.5rem" />
              <rect width="100%" height="100%" fill="url(#btn-top)" rx="1.5rem" />
              <rect width="100%" height="100%" fill="url(#btn-bottom)" rx="1.5rem" />
              <rect width="100%" height="100%" fill="url(#btn-right)" rx="1.5rem" />
            </svg>
          </button>
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
