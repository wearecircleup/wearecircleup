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
              <div className="p-8">
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
                <p className="text-n-3 mb-4">
                  Se eliminará tu perfil y todas tus presentaciones.
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 bg-n-8 border-t border-n-6 flex gap-3">
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
              <div className="p-8">
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
              <div className="p-6 bg-n-8 border-t border-n-6 flex gap-3">
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
    </div>
  );
};


export default AccountDeletion;
