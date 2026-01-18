import ParticleLogo from '../components/presentation/ParticleLogo';

export default function ParticleLogoTest() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <ParticleLogo />
      
      {/* Instructions overlay */}
      <div className="absolute top-8 left-8 bg-n-7/80 backdrop-blur-sm border border-n-6 rounded-xl p-4 max-w-sm z-20">
        <h3 className="text-n-1 font-bold mb-2">Particle Logo Test</h3>
        <p className="text-n-3 text-sm">
          Mueve el mouse sobre el logo para ver el efecto de partículas reactivas.
          Las partículas se desplazan y crean ondas siguiendo tu cursor.
        </p>
      </div>
    </div>
  );
}
