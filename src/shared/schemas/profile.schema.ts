import { z } from 'zod';

/**
 * Age range schema for Colombian demographic data
 * Aligned with platform age restrictions (minimum 14 years)
 */
export const ageRangeSchema = z.enum(['14-17', '18-24', '25-34', '35+'], {
  errorMap: () => ({ message: 'Selecciona un rango de edad válido' })
});

/**
 * Education level schema based on Colombian education system
 * Primaria -> Bachillerato -> Técnico/Tecnólogo -> Universitario -> Posgrado
 */
export const educationLevelSchema = z.enum([
  'primaria',
  'bachillerato',
  'tecnico',
  'tecnologo',
  'universitario',
  'posgrado'
], {
  errorMap: () => ({ message: 'Selecciona un nivel de escolaridad válido' })
});

/**
 * Education status schema
 * in-progress: Currently studying
 * completed: Finished the level
 */
export const educationStatusSchema = z.enum(['in-progress', 'completed'], {
  errorMap: () => ({ message: 'Selecciona el estado de tu escolaridad' })
});

/**
 * User role schema
 * Default: Volunteer (immutable by users)
 * Future roles: Business, Participant, Admin
 */
export const roleSchema = z.enum(['Volunteer', 'Business', 'Participant', 'Admin'], {
  errorMap: () => ({ message: 'Rol de usuario inválido' })
}).default('Volunteer');

/**
 * Base profile object schema (without refinements)
 */
const profileBaseSchema = z.object({
  // System fields (auto-generated)
  userId: z.string().min(1, 'ID de usuario requerido'),
  login: z.string().min(1, 'Login de GitHub requerido'),
  email: z.string().email('Email inválido'),
  
  // Required profile fields
  firstName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  lastName: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
  
  ageRange: ageRangeSchema,
  
  educationLevel: educationLevelSchema,
  educationStatus: educationStatusSchema,
  
  // User role (immutable by users, default: Volunteer)
  role: roleSchema,
  
  // Legal compliance
  legalDisclaimerAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la declaración legal para continuar' })
  }),
  
  parentalConsentConfirmed: z.boolean().optional(),
  
  // GitHub data (immutable)
  githubData: z.object({
    avatarUrl: z.string().min(1, 'Avatar URL requerida').optional(),
    username: z.string().min(1, 'Username de GitHub requerido'),
    email: z.string().email('Email de GitHub inválido').optional()
  })
});

/**
 * Complete user profile schema with validation rules
 * This schema is used for profile creation and updates
 */
export const profileSchema = profileBaseSchema.refine(
  (data) => {
    // Age restriction: If user is 14-17, parental consent is mandatory
    if (data.ageRange === '14-17') {
      return data.parentalConsentConfirmed === true;
    }
    return true;
  },
  {
    message: 'Se requiere consentimiento parental para menores de 18 años',
    path: ['parentalConsentConfirmed']
  }
);

/**
 * Profile update schema (partial profile, excludes immutable fields)
 */
export const profileUpdateSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  firstName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')
    .optional(),
  lastName: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras')
    .optional(),
  ageRange: ageRangeSchema.optional(),
  educationLevel: educationLevelSchema.optional(),
  educationStatus: educationStatusSchema.optional(),
  parentalConsentConfirmed: z.boolean().optional()
});

/**
 * Internal profile record schema (includes metadata for NDJSON storage)
 * This is what gets stored in Vercel Blob
 */
export const profileRecordSchema = profileBaseSchema.extend({
  version: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  profileComplete: z.boolean(),
  legalDisclaimerAcceptedAt: z.string().datetime(),
  deleted: z.boolean().optional()
}).refine(
  (data) => {
    // Age restriction: If user is 14-17, parental consent is mandatory
    if (data.ageRange === '14-17') {
      return data.parentalConsentConfirmed === true;
    }
    return true;
  },
  {
    message: 'Se requiere consentimiento parental para menores de 18 años',
    path: ['parentalConsentConfirmed']
  }
);

/**
 * Deletion record schema for soft deletes in NDJSON
 */
export const deletionRecordSchema = z.object({
  deleted: z.literal(true),
  deletedAt: z.string().datetime(),
  deletedBy: z.string().min(1)
});

// Type exports for TypeScript
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type EducationLevel = z.infer<typeof educationLevelSchema>;
export type EducationStatus = z.infer<typeof educationStatusSchema>;
export type UserProfile = z.infer<typeof profileSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type ProfileRecord = z.infer<typeof profileRecordSchema>;
export type DeletionRecord = z.infer<typeof deletionRecordSchema>;

/**
 * Education level display names in Spanish
 */
export const educationLevelLabels: Record<EducationLevel, string> = {
  primaria: 'Primaria',
  bachillerato: 'Bachillerato',
  tecnico: 'Técnico',
  tecnologo: 'Tecnólogo',
  universitario: 'Universitario',
  posgrado: 'Posgrado'
};

/**
 * Age range display labels
 */
export const ageRangeLabels: Record<AgeRange, string> = {
  '14-17': '14-17 años',
  '18-24': '18-24 años',
  '25-34': '25-34 años',
  '35+': '35+ años'
};

/**
 * Education status display labels
 */
export const educationStatusLabels: Record<EducationStatus, string> = {
  'in-progress': 'En progreso',
  'completed': 'Completado'
};
