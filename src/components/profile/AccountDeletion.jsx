import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileService } from '../../shared/utils/profile';
import { GitHubAuthService } from '../../shared/utils/github';
import Button from '../Button';

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
    if (confirmText !== 'eliminar') {
      setError('Debes escribir exactamente "eliminar" para confirmar');
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
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-n-1 mb-2">Eliminar Cuenta</h1>
            <p className="text-n-3">Esta acción es permanente</p>
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
              className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden"
            >
              {/* Profile info */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={profile.githubData.avatarUrl}
                    alt={profile.firstName}
                    className="w-16 h-16 rounded-xl"
                  />
                  <div>
                    <p className="text-lg text-n-1 font-semibold">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-sm text-n-4">@{profile.login}</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="text-red-400 font-semibold mb-3">Eliminación permanente de datos</h3>
                      <p className="text-n-3 text-sm leading-relaxed">
                        Esta acción eliminará <strong className="text-n-1">completamente y de forma irreversible</strong> toda tu información de nuestras bases de datos. Esto incluye tu perfil personal con nombre, email, edad y educación, así como todas tus presentaciones creadas con IA junto con todo su contenido y slides. También se borrará tu historial de actividad y preferencias.
                      </p>
                      <p className="text-n-4 text-sm mt-3 italic leading-relaxed">
                        No podremos recuperar esta información una vez eliminada. Si deseas usar Circle Up nuevamente, deberás crear un perfil desde cero.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 sm:p-6 bg-n-8 border-t border-n-6 flex flex-col sm:flex-row gap-3">
                <Button onClick={onCancel} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={() => setStep(2)} white className="flex-1">
                  Continuar
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden"
            >
              {/* Confirmation input */}
              <div className="p-4 sm:p-6 md:p-8">
                <label className="block text-sm font-medium text-n-2 mb-3">
                  Para confirmar, escribe: <span className="font-mono font-semibold text-n-1">eliminar</span>
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleConfirmDelete()}
                  placeholder="eliminar"
                  className="w-full px-4 py-3 bg-n-8 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
                  autoFocus
                  disabled={isDeleting}
                />
                {error && (
                  <p className="mt-2 text-sm text-n-4">{error}</p>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 sm:p-6 bg-n-8 border-t border-n-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => {
                    setStep(1);
                    setConfirmText('');
                    setError('');
                  }}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  disabled={confirmText !== 'eliminar' || isDeleting}
                  white
                  className="flex-1"
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  );
};


export default AccountDeletion;
