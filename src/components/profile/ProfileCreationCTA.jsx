import { motion } from 'framer-motion';
import Button from '../Button';
import AudioWaveParticles from './AudioWaveParticles';

/**
 * ProfileCreationCTA - Spotify-style Call-to-Action
 * 
 * Displayed when user doesn't have a profile yet.
 * Full-screen centered layout with gradient button and decorative elements.
 */
const ProfileCreationCTA = ({ onStart }) => {

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden px-4 py-12">

      {/* Main content */}
      <motion.div
        className="relative text-center w-full -mt-[15vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Audio Wave Particles Animation with HOLA inside */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-0">
          <div className="relative">
            <AudioWaveParticles />
            {/* HOLA inside waves - centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-black text-n-1 z-30" style={{ fontWeight: 950 }}>
                HOLA
              </span>
            </motion.div>
          </div>
        </div>

        {/* Volunteer below waves - almost touching */}
        <motion.div
          className="-mt-16 mb-4 px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-center">
            <span className="text-5xl md:text-6xl lg:text-7xl font-mono text-n-1 tracking-normal" style={{ fontWeight: 200 }}>
              Volunteer
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-n-3 mb-6 max-w-lg mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Para comenzar a crear presentaciones increíbles con IA, necesitamos conocerte un poco mejor.
        </motion.p>

        {/* CTA Button - Using Button component */}
        <motion.div
          className="relative z-10"
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
          className="mt-6 text-sm text-n-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Menos de 1 minuto • Información segura y privada
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProfileCreationCTA;
