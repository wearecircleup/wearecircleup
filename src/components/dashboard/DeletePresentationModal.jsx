import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';

const DeletePresentationModal = ({ presentation, onConfirm, onCancel, isDeleting }) => {
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleConfirmDelete = () => {
    if (confirmText.toLowerCase() !== 'eliminar') {
      setError('Debes escribir exactamente "eliminar" para confirmar');
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-n-1 mb-2">¿Eliminar presentación?</h2>
                    <p className="text-n-3 text-sm">Esta acción es permanente y no se puede deshacer</p>
                  </div>
                  <button
                    onClick={onCancel}
                    className="p-2 text-n-3 hover:text-n-1 hover:bg-n-6 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="bg-n-8/50 border border-n-6/50 rounded-xl p-4 mb-6">
                  <p className="text-n-2 font-semibold mb-1">{presentation.title}</p>
                  <p className="text-n-4 text-sm line-clamp-2">{presentation.description}</p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ten en cuenta
                  </h3>
                  <p className="text-n-3 text-sm italic leading-relaxed">
                    Al eliminar esta presentación, se borrarán todos los slides y contenido de forma permanente. Esta acción es inmediata y no podrás recuperar la presentación una vez confirmada.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={onCancel} className="flex-1">
                    Cancelar
                  </Button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-n-1 mb-2">Confirmación final</h2>
                    <p className="text-n-3 text-sm">Escribe "eliminar" para confirmar</p>
                  </div>
                  <button
                    onClick={onCancel}
                    className="p-2 text-n-3 hover:text-n-1 hover:bg-n-6 rounded-lg transition-all"
                    disabled={isDeleting}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-n-3 text-sm mb-2">
                    Escribe <span className="text-red-400 font-semibold">eliminar</span> para confirmar
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      setError('');
                    }}
                    placeholder="eliminar"
                    className="w-full bg-n-6 border border-n-5 text-n-1 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                    disabled={isDeleting}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setStep(1)} 
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    ← Atrás
                  </Button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting || !confirmText}
                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Eliminando...
                      </>
                    ) : (
                      'Eliminar definitivamente'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DeletePresentationModal;
