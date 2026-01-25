import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileService } from '../../shared/utils/profile';
import { GitHubAuthService } from '../../shared/utils/github';

/**
 * AccountDeletion - Two-step confirmation for account deletion
 * 
 * Step 1: Warning with consequences
 * Step 2: Type "Delete" to confirm
 */
const AccountDeletion = ({ profile, user, onDelete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmDelete = async () => {
    if (confirmText !== 'Delete') {
      setError('Debes escribir exactamente "Delete" para confirmar');
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const result = await ProfileService.deleteProfile(
        profile.userId, 
        confirmText, 
        user.accessToken
      );

      if (result.success) {
        // Wait a moment to show success state
        setTimeout(() => {
          // Clear profile data
          onDelete();
          
          // Logout from GitHub and redirect to home
          GitHubAuthService.logout();
          window.location.href = '/';
        }, 1500);
      } else {
        setError(result.error || 'Error al eliminar la cuenta');
        setIsDeleting(false);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Error al eliminar la cuenta. Por favor intenta de nuevo.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8 p-6">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2">Eliminar Cuenta</h1>
            <p className="text-n-3">Esta acción no se puede deshacer</p>
          </div>
          <button
            onClick={onCancel}
            className="p-3 text-n-3 hover:text-n-1 hover:bg-n-7 rounded-xl transition-all"
            disabled={isDeleting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-n-7 border-2 border-red-500/30 rounded-2xl overflow-hidden"
            >
              {/* Warning icon */}
              <div className="p-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-b border-red-500/30">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-n-1 mb-2">
                  ¿Estás seguro de que quieres eliminar tu cuenta?
                </h2>
                <p className="text-center text-n-3">
                  Esta acción es permanente y no se puede revertir
                </p>
              </div>

              {/* Consequences list */}
              <div className="p-8">
                <h3 className="text-lg font-semibold text-n-1 mb-4">
                  Al eliminar tu cuenta:
                </h3>
                <div className="space-y-4">
                  <ConsequenceItem
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                    text="Se eliminará toda tu información personal"
                  />
                  <ConsequenceItem
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                    text="Se eliminarán todas tus presentaciones generadas"
                  />
                  <ConsequenceItem
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    text="Perderás el historial completo de tu actividad"
                  />
                  <ConsequenceItem
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />}
                    text="No podrás recuperar tu cuenta ni tus datos"
                  />
                </div>

                {/* Profile info */}
                <div className="mt-8 p-4 bg-n-8 border border-n-6 rounded-xl">
                  <div className="flex items-center gap-4">
                    <img
                      src={profile.githubData.avatarUrl}
                      alt={profile.firstName}
                      className="w-12 h-12 rounded-xl"
                    />
                    <div>
                      <p className="text-sm text-n-2 font-medium">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-xs text-n-4">@{profile.login} • {profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-n-8 border-t border-n-6 flex items-center justify-between">
                <button
                  onClick={onCancel}
                  className="px-6 py-3 bg-n-7 text-n-1 rounded-xl font-semibold hover:bg-n-6 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                >
                  Continuar con la eliminación
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-n-7 border-2 border-red-500/30 rounded-2xl overflow-hidden"
            >
              {/* Confirmation header */}
              <div className="p-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-b border-red-500/30">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-n-1 mb-2">
                  Confirmación final
                </h2>
                <p className="text-center text-n-3">
                  Escribe <span className="font-mono font-bold text-red-500">Delete</span> para confirmar
                </p>
              </div>

              {/* Confirmation input */}
              <div className="p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-n-2 mb-3">
                    Para confirmar, escribe exactamente: <span className="font-mono font-bold text-red-500">Delete</span>
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      setError('');
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleConfirmDelete()}
                    placeholder="Delete"
                    className="w-full px-4 py-3 bg-n-8 border-2 border-red-500/30 rounded-xl text-n-1 placeholder:text-n-4 focus:border-red-500 focus:outline-none transition-colors font-mono"
                    autoFocus
                    disabled={isDeleting}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                {/* Final warning */}
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-sm text-red-400 font-medium">Última advertencia</p>
                      <p className="text-xs text-n-3 mt-1">
                        Una vez confirmado, tu cuenta será eliminada permanentemente. Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-n-8 border-t border-n-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setStep(1);
                    setConfirmText('');
                    setError('');
                  }}
                  className="px-6 py-3 text-n-3 hover:text-n-1 transition-colors"
                  disabled={isDeleting}
                >
                  Atrás
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={confirmText !== 'Delete' || isDeleting}
                  className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Eliminando...
                    </span>
                  ) : (
                    'Eliminar mi cuenta permanentemente'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help text */}
        <motion.div
          className="mt-6 p-4 bg-n-7/50 border border-n-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-color-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-n-2">
                ¿Tienes problemas con tu cuenta?
              </p>
              <p className="text-xs text-n-4 mt-1">
                Antes de eliminarla, considera contactar a soporte. Podemos ayudarte a resolver cualquier problema.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Consequence item component
const ConsequenceItem = ({ icon, text }) => (
  <div className="flex items-start gap-3 p-3 bg-n-8 rounded-lg border border-red-500/20">
    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <p className="text-sm text-n-2 pt-1">{text}</p>
  </div>
);

export default AccountDeletion;
