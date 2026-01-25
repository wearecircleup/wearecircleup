import { motion } from 'framer-motion';
import Button from '../Button';

/**
 * ProfileView - Display user profile information
 * 
 * Shows all profile fields in a card-based design
 * Includes edit button and role display (locked)
 */
const ProfileView = ({ profile, onEdit, onClose, onDelete }) => {
  const educationLevelLabels = {
    primaria: 'Primaria',
    bachillerato: 'Bachillerato',
    tecnico: 'Técnico',
    tecnologo: 'Tecnólogo',
    universitario: 'Universitario',
    posgrado: 'Posgrado'
  };

  const educationStatusLabels = {
    'in-progress': 'En curso',
    'completed': 'Completado'
  };

  const roleIcons = {
    Volunteer: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    Business: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    Participant: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    Admin: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    )
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-n-8/95 p-4 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Profile Card */}
        <div className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden">
          {/* Avatar and basic info */}
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-color-1/10 to-color-2/10 border-b border-n-6">
            <div className="flex items-start gap-6">
              <img
                src={profile.githubData.avatarUrl}
                alt={profile.firstName}
                className="w-24 h-24 rounded-2xl border-2 border-color-1/50"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-n-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-n-3 mt-1">@{profile.login}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-3 py-1 bg-n-7 rounded-full text-sm text-n-2">
                    {profile.email}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    Verificado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile details grid */}
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Role - Locked */}
            <div className="md:col-span-2 p-6 bg-gradient-to-br from-color-1/10 to-color-2/10 border-2 border-color-1/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-color-1 to-color-2 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {roleIcons[profile.role]}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-n-4">Rol en Circle Up</p>
                    <p className="text-xl font-bold text-n-1">{profile.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-n-7/50 rounded-full">
                  <svg className="w-4 h-4 text-n-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-n-4">Bloqueado</span>
                </div>
              </div>
            </div>

            {/* Age Range */}
            <ProfileField
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              }
              label="Rango de edad"
              value={`${profile.ageRange} años`}
            />

            {/* Education Level */}
            <ProfileField
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              }
              label="Nivel educativo"
              value={educationLevelLabels[profile.educationLevel]}
            />

            {/* Education Status */}
            <ProfileField
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
              label="Estado"
              value={educationStatusLabels[profile.educationStatus]}
            />

            {/* Member Since */}
            <ProfileField
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
              label="Miembro desde"
              value={new Date(profile.createdAt).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            />

            {/* Profile Version */}
            {profile.version > 1 && (
              <div className="md:col-span-2 p-4 bg-n-8 rounded-xl border border-n-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-n-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-n-3">
                    Perfil actualizado {profile.version - 1} {profile.version === 2 ? 'vez' : 'veces'} • 
                    Última actualización: {new Date(profile.updatedAt).toLocaleDateString('es-CO')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <Button onClick={onClose} className="flex-1">
              Cerrar
            </Button>
            <Button onClick={onEdit} white className="flex-1">
              Editar Perfil
            </Button>
            <Button onClick={onDelete} className="flex-1">
              Eliminar Cuenta
            </Button>
          </div>
        </div>

        {/* Legal disclaimer info */}
        {profile.legalDisclaimerAcceptedAt && (
          <motion.div
            className="mt-6 p-4 bg-n-7/50 border border-n-6 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-n-2">Declaración legal aceptada</p>
                <p className="text-xs text-n-4 mt-1">
                  {new Date(profile.legalDisclaimerAcceptedAt).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Profile field component
const ProfileField = ({ icon, label, value }) => (
  <div className="p-4 bg-n-8 rounded-xl border border-n-6">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-color-1/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-color-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-n-4 mb-1">{label}</p>
        <p className="text-base font-medium text-n-1 truncate">{value}</p>
      </div>
    </div>
  </div>
);

export default ProfileView;
