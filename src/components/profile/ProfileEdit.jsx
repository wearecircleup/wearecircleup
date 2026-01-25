import { useState } from 'react';
import { motion } from 'framer-motion';
import { profileUpdateSchema } from '../../shared/schemas/profile.schema';
import { ProfileService } from '../../shared/utils/profile';
import Button from '../Button';

/**
 * ProfileEdit - Edit user profile
 * 
 * Allows editing all fields except:
 * - userId (immutable)
 * - email (immutable)
 * - role (immutable, locked)
 * - login (immutable)
 */
const ProfileEdit = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    userId: profile.userId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    ageRange: profile.ageRange,
    educationLevel: profile.educationLevel,
    educationStatus: profile.educationStatus,
    parentalConsentConfirmed: profile.parentalConsentConfirmed || false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const educationLevelLabels = {
    primaria: 'Primaria',
    bachillerato: 'Bachillerato',
    tecnico: 'Técnico',
    tecnologo: 'Tecnólogo',
    universitario: 'Universitario',
    posgrado: 'Posgrado'
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'El nombre solo puede contener letras';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'El apellido solo puede contener letras';
    }

    if (!formData.ageRange) {
      newErrors.ageRange = 'Selecciona tu rango de edad';
    }

    // Check parental consent for minors
    if (formData.ageRange === '14-17' && !formData.parentalConsentConfirmed) {
      newErrors.parentalConsentConfirmed = 'Se requiere consentimiento parental para menores de 18 años';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Selecciona tu nivel de escolaridad';
    }

    if (!formData.educationStatus) {
      newErrors.educationStatus = 'Selecciona el estado de tu escolaridad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate with Zod schema
      const validatedData = profileUpdateSchema.parse(formData);

      // Extract userId and updates
      const { userId, ...updates } = validatedData;

      // Update profile via API
      const result = await ProfileService.updateProfile(userId, updates);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          onSave(result.profile);
        }, 1500);
      } else {
        setErrors({ submit: result.error || 'Error al actualizar el perfil' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Validation error:', error);
      if (error.errors) {
        const zodErrors = {};
        error.errors.forEach(err => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      } else {
        setErrors({ submit: 'Error de validación. Por favor verifica todos los campos.' });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8 p-6">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-n-1 mb-2">Editar Perfil</h1>
            <p className="text-n-3">Actualiza tu información personal</p>
          </div>
          <button
            onClick={onCancel}
            className="p-3 text-n-3 hover:text-n-1 hover:bg-n-7 rounded-xl transition-all"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success message */}
        {showSuccess && (
          <motion.div
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-500 font-medium">¡Perfil actualizado exitosamente!</p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-n-7 border border-n-6 rounded-2xl overflow-hidden">
          {/* Immutable fields display */}
          <div className="p-8 bg-n-8 border-b border-n-6">
            <h3 className="text-lg font-semibold text-n-1 mb-4">Información de cuenta (no editable)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImmutableField
                label="Email"
                value={profile.email}
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
              />
              <ImmutableField
                label="Usuario"
                value={`@${profile.login}`}
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
              />
              <ImmutableField
                label="Rol"
                value={profile.role}
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
              />
            </div>
          </div>

          {/* Editable fields */}
          <div className="p-8 space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Nombre"
                error={errors.firstName}
              >
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-n-8 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </FormField>

              <FormField
                label="Apellido"
                error={errors.lastName}
              >
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-n-8 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
                  placeholder="Tu apellido"
                />
              </FormField>
            </div>

            {/* Age range */}
            <FormField
              label="Rango de edad"
              error={errors.ageRange}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['14-17', '18-24', '25-34', '35+'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => updateField('ageRange', range)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      formData.ageRange === range
                        ? 'border-color-1 bg-color-1/10 text-n-1'
                        : 'border-n-6 bg-n-8 text-n-3 hover:border-n-5'
                    }`}
                  >
                    {range} años
                  </button>
                ))}
              </div>
            </FormField>

            {/* Parental consent for minors */}
            {formData.ageRange === '14-17' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.parentalConsentConfirmed}
                    onChange={(e) => updateField('parentalConsentConfirmed', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-yellow-500/50 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-n-2">
                    Confirmo que tengo el consentimiento de mis padres o tutor legal
                  </span>
                </label>
                {errors.parentalConsentConfirmed && (
                  <p className="mt-2 text-sm text-red-500">{errors.parentalConsentConfirmed}</p>
                )}
              </motion.div>
            )}

            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Nivel educativo"
                error={errors.educationLevel}
              >
                <select
                  value={formData.educationLevel}
                  onChange={(e) => updateField('educationLevel', e.target.value)}
                  className="w-full px-4 py-3 bg-n-8 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona...</option>
                  {Object.entries(educationLevelLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Estado"
                error={errors.educationStatus}
              >
                <select
                  value={formData.educationStatus}
                  onChange={(e) => updateField('educationStatus', e.target.value)}
                  className="w-full px-4 py-3 bg-n-8 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                >
                  <option value="in-progress">En curso</option>
                  <option value="completed">Completado</option>
                </select>
              </FormField>
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-sm text-red-500">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-n-8 border-t border-n-6 flex gap-3">
            <Button
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || showSuccess}
              white
              className="flex-1"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>

        {/* Info note */}
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
                Los campos Email, Usuario y Rol no pueden ser modificados por razones de seguridad.
              </p>
              <p className="text-xs text-n-4 mt-1">
                Cada actualización incrementa la versión de tu perfil y se guarda en el historial.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Immutable field display component
const ImmutableField = ({ label, value, icon }) => (
  <div className="p-4 bg-n-7/50 rounded-xl border border-n-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-n-6/50 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-n-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-n-4 mb-1">{label}</p>
        <p className="text-sm font-medium text-n-3 truncate">{value}</p>
      </div>
      <svg className="w-4 h-4 text-n-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  </div>
);

// Form field wrapper component
const FormField = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-n-2 mb-2">{label}</label>
    {children}
    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
  </div>
);

export default ProfileEdit;
