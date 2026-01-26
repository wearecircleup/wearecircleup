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
          className="mb-12 text-sm text-n-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Menos de 1 minuto • Información segura y privada
        </motion.p>

        {/* Audio Wave Particles - Footer style */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16">
          <AudioWaveParticles />
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCreationCTA;
