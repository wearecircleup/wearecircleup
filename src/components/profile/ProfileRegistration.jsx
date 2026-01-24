import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileSchema } from '../../shared/schemas/profile.schema';
import { ProfileService } from '../../shared/utils/profile';
import Button from '../Button';

/**
 * ProfileRegistration - Typeform-style multi-step form
 * 
 * 6 steps + role display:
 * 1. Nombre
 * 2. Apellido
 * 3. Email (auto-filled, read-only)
 * 4. Rango de edad (con validación parental)
 * 5. Nivel educativo
 * 6. Disclaimer legal
 * + Role display (bloqueado, siempre "Volunteer")
 */
const ProfileRegistration = ({ user, onComplete, onCancel }) => {
  console.log('ProfileRegistration - user object:', user);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userId: user?.id || user?.node_id || '',
    login: user?.login || user?.username || '',
    email: user?.email || '',
    firstName: '',
    lastName: '',
    ageRange: '',
    educationLevel: '',
    educationStatus: 'in-progress',
    role: 'Volunteer', // Default, immutable
    legalDisclaimerAccepted: false,
    parentalConsentConfirmed: false,
    githubData: {
      avatarUrl: user?.avatarUrl || user?.avatar_url || '',
      username: user?.login || user?.username || '',
      email: user?.email || ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 7; // 6 steps + role display

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // First name
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'El nombre es requerido';
        } else if (formData.firstName.length < 2) {
          newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.firstName)) {
          newErrors.firstName = 'El nombre solo puede contener letras';
        }
        break;

      case 2: // Last name
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'El apellido es requerido';
        } else if (formData.lastName.length < 2) {
          newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.lastName)) {
          newErrors.lastName = 'El apellido solo puede contener letras';
        }
        break;

      case 4: // Age range
        if (!formData.ageRange) {
          newErrors.ageRange = 'Selecciona tu rango de edad';
        }
        // Check parental consent for minors
        if (formData.ageRange === '14-17' && !formData.parentalConsentConfirmed) {
          newErrors.parentalConsentConfirmed = 'Se requiere consentimiento parental para menores de 18 años';
        }
        break;

      case 5: // Education level
        if (!formData.educationLevel) {
          newErrors.educationLevel = 'Selecciona tu nivel de escolaridad';
        }
        if (!formData.educationStatus) {
          newErrors.educationStatus = 'Selecciona el estado de tu escolaridad';
        }
        break;

      case 6: // Legal disclaimer
        if (!formData.legalDisclaimerAccepted) {
          newErrors.legalDisclaimerAccepted = 'Debes aceptar la declaración legal para continuar';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    console.log('Form data:', formData);
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate with Zod schema
      console.log('Validating with Zod...');
      const validatedData = profileSchema.parse(formData);
      console.log('Validation successful:', validatedData);

      // Create profile via API
      console.log('Calling ProfileService.createProfile...');
      const result = await ProfileService.createProfile(validatedData);
      console.log('API result:', result);

      if (result.success) {
        console.log('Profile created successfully');
        onComplete(result.profile);
      } else {
        console.error('API error:', result.error);
        setErrors({ submit: result.error || 'Error al crear el perfil' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Validation error:', error);
      if (error.errors) {
        const zodErrors = {};
        error.errors.forEach(err => {
          zodErrors[err.path[0]] = err.message;
        });
        console.log('Zod errors:', zodErrors);
        setErrors(zodErrors);
      } else {
        setErrors({ submit: 'Error de validación. Por favor verifica todos los campos.' });
      }
      setIsSubmitting(false);
    }
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

  // Step content components
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContent
            title="¿Cuál es tu nombre?"
            subtitle="Así te conocerán en Circle Up Volunteer"
          >
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
              placeholder="Escribe tu nombre"
              className="w-full px-6 py-4 text-lg bg-n-7 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
              autoFocus
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>
            )}
          </StepContent>
        );

      case 2:
        return (
          <StepContent
            title="¿Y tu apellido?"
            subtitle="Para completar tu identificación"
          >
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
              placeholder="Escribe tu apellido"
              className="w-full px-6 py-4 text-lg bg-n-7 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
              autoFocus
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>
            )}
          </StepContent>
        );

      case 3:
        return (
          <StepContent
            title="Email de contacto"
            subtitle={formData.email ? "Obtenido de tu cuenta de GitHub" : "Tu email de GitHub es privado"}
          >
            {formData.email ? (
              <>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-6 py-4 text-lg bg-n-7/50 border border-n-6 rounded-xl text-n-1 cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-n-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-n-4">Este campo no se puede modificar</p>
              </>
            ) : (
              <>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="tu@email.com"
                  className="w-full px-6 py-4 text-lg bg-n-7 border border-n-6 rounded-xl text-n-1 placeholder:text-n-4 focus:border-color-1 focus:outline-none transition-colors"
                  autoFocus
                />
                <p className="mt-2 text-sm text-n-4">
                  Tu email de GitHub es privado. Por favor ingresa un email de contacto.
                </p>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </>
            )}
          </StepContent>
        );

      case 4:
        return (
          <StepContent
            title="¿Cuál es tu rango de edad?"
            subtitle="Necesitamos esta información para personalizar tu experiencia"
          >
            <div className="space-y-3">
              {['14-17', '18-24', '25-34', '35+'].map((range) => (
                <button
                  key={range}
                  onClick={() => updateField('ageRange', range)}
                  className={`w-full px-6 py-4 text-left rounded-xl border-2 transition-all ${
                    formData.ageRange === range
                      ? 'border-color-1 bg-color-1/10 text-n-1'
                      : 'border-n-6 bg-n-7 text-n-3 hover:border-n-5'
                  }`}
                >
                  <span className="text-lg font-medium">{range} años</span>
                </button>
              ))}
            </div>
            {errors.ageRange && (
              <p className="mt-2 text-sm text-red-500">{errors.ageRange}</p>
            )}

            {/* Parental consent for minors */}
            {formData.ageRange === '14-17' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.parentalConsentConfirmed}
                    onChange={(e) => updateField('parentalConsentConfirmed', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-yellow-500/50 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-n-2">
                    Confirmo que tengo el consentimiento de mis padres o tutor legal para registrarme en Circle Up
                  </span>
                </label>
                {errors.parentalConsentConfirmed && (
                  <p className="mt-2 text-sm text-red-500">{errors.parentalConsentConfirmed}</p>
                )}
              </motion.div>
            )}
          </StepContent>
        );

      case 5:
        return (
          <StepContent
            title="Nivel de escolaridad"
            subtitle="Ayúdanos a conocer tu formación académica"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-n-3 mb-2">Nivel educativo</label>
                <div className="space-y-2">
                  {[
                    { value: 'primaria', label: 'Primaria' },
                    { value: 'bachillerato', label: 'Bachillerato' },
                    { value: 'tecnico', label: 'Técnico' },
                    { value: 'tecnologo', label: 'Tecnólogo' },
                    { value: 'universitario', label: 'Universitario' },
                    { value: 'posgrado', label: 'Posgrado' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => updateField('educationLevel', level.value)}
                      className={`w-full px-6 py-3 text-left rounded-xl border-2 transition-all ${
                        formData.educationLevel === level.value
                          ? 'border-color-1 bg-color-1/10 text-n-1'
                          : 'border-n-6 bg-n-7 text-n-3 hover:border-n-5'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
                {errors.educationLevel && (
                  <p className="mt-2 text-sm text-red-500">{errors.educationLevel}</p>
                )}
              </div>

              {formData.educationLevel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm text-n-3 mb-2">Estado</label>
                  <div className="space-y-2">
                    {[
                      { value: 'in-progress', label: 'En curso' },
                      { value: 'completed', label: 'Completado' }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => updateField('educationStatus', status.value)}
                        className={`w-full px-6 py-3 text-left rounded-xl border-2 transition-all ${
                          formData.educationStatus === status.value
                            ? 'border-color-1 bg-color-1/10 text-n-1'
                            : 'border-n-6 bg-n-7 text-n-3 hover:border-n-5'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                  {errors.educationStatus && (
                    <p className="mt-2 text-sm text-red-500">{errors.educationStatus}</p>
                  )}
                </motion.div>
              )}
            </div>
          </StepContent>
        );

      case 6:
        return (
          <StepContent
            title="Declaración legal"
            subtitle="Tu privacidad y seguridad son nuestra prioridad"
          >
            <div className="p-8 bg-gradient-to-br from-n-7 to-n-8 border border-n-6 rounded-2xl">
              <p className="text-base text-n-2 leading-relaxed italic font-light">
                Al unirte a Circle Up Volunteer, tus datos personales se almacenan de forma segura y solo se usan para personalizar tu experiencia. Tienes control total sobre tu información y puedes eliminar tu cuenta cuando lo desees. Nos comprometemos a mantener un espacio seguro y respetuoso para todos.
              </p>
            </div>

            <label className="mt-8 flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.legalDisclaimerAccepted}
                onChange={(e) => updateField('legalDisclaimerAccepted', e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-n-5 text-color-1 focus:ring-color-1 focus:ring-offset-2 focus:ring-offset-n-8"
              />
              <span className="text-base text-n-2 group-hover:text-n-1 transition-colors">
                Acepto los términos y condiciones de Circle Up Volunteer
              </span>
            </label>
            {errors.legalDisclaimerAccepted && (
              <p className="mt-2 text-sm text-red-500">{errors.legalDisclaimerAccepted}</p>
            )}
          </StepContent>
        );

      case 7:
        return (
          <StepContent
            title="Tu rol en Circle Up"
            subtitle="Este campo es asignado automáticamente"
          >
            <div className="p-6 bg-gradient-to-br from-color-1/10 to-color-2/10 border-2 border-color-1/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-2 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-n-1">Volunteer</h3>
                  <p className="text-sm text-n-3 mt-1">Rol por defecto para todos los usuarios</p>
                </div>
                <div className="px-3 py-1 bg-n-7/50 rounded-full">
                  <svg className="w-5 h-5 text-n-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-n-7/50 border border-n-6 rounded-xl">
              <p className="text-sm text-n-3">
                <strong className="text-n-2">Nota:</strong> Este campo no puede ser modificado por usuarios. 
                Los roles Business, Participant y Admin son asignados por administradores de la plataforma.
              </p>
            </div>

            {errors.submit && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-sm text-red-500">{errors.submit}</p>
              </div>
            )}
          </StepContent>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-n-8 p-6">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-n-4">Paso {currentStep} de {totalSteps}</span>
            <span className="text-sm text-n-4">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-n-7 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-color-1 to-color-2"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={currentStep === 1 ? onCancel : handleBack}
            className="px-6 py-3 text-n-3 hover:text-n-1 transition-colors"
            disabled={isSubmitting}
          >
            {currentStep === 1 ? 'Cancelar' : 'Atrás'}
          </button>

          {currentStep === totalSteps ? (
            <Button 
              onClick={handleNext} 
              white 
              className="text-sm lg:text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creando...
                </span>
              ) : (
                'Crear Perfil'
              )}
            </Button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-color-1 to-color-2 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-color-1/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step content wrapper component
const StepContent = ({ title, subtitle, children }) => (
  <div>
    <h2 className="text-3xl md:text-4xl font-bold text-n-1 mb-2">{title}</h2>
    {subtitle && <p className="text-lg text-n-3 mb-8">{subtitle}</p>}
    {children}
  </div>
);

export default ProfileRegistration;
