import { describe, it, expect } from 'vitest';
import {
  ageRangeSchema,
  educationLevelSchema,
  educationStatusSchema,
  profileSchema,
  profileUpdateSchema,
  profileRecordSchema,
  deletionRecordSchema
} from '../../../src/shared/schemas/profile.schema';

describe('Profile Schemas - Unit Tests', () => {
  
  describe('ageRangeSchema', () => {
    it('should accept valid age ranges', () => {
      expect(ageRangeSchema.parse('14-17')).toBe('14-17');
      expect(ageRangeSchema.parse('18-24')).toBe('18-24');
      expect(ageRangeSchema.parse('25-34')).toBe('25-34');
      expect(ageRangeSchema.parse('35+')).toBe('35+');
    });

    it('should reject invalid age ranges', () => {
      expect(() => ageRangeSchema.parse('10-13')).toThrow();
      expect(() => ageRangeSchema.parse('invalid')).toThrow();
      expect(() => ageRangeSchema.parse('')).toThrow();
    });
  });

  describe('educationLevelSchema', () => {
    it('should accept all Colombian education levels', () => {
      const levels = ['primaria', 'bachillerato', 'tecnico', 'tecnologo', 'universitario', 'posgrado'];
      levels.forEach(level => {
        expect(educationLevelSchema.parse(level)).toBe(level);
      });
    });

    it('should reject invalid education levels', () => {
      expect(() => educationLevelSchema.parse('high-school')).toThrow();
      expect(() => educationLevelSchema.parse('college')).toThrow();
      expect(() => educationLevelSchema.parse('')).toThrow();
    });
  });

  describe('educationStatusSchema', () => {
    it('should accept valid education statuses', () => {
      expect(educationStatusSchema.parse('in-progress')).toBe('in-progress');
      expect(educationStatusSchema.parse('completed')).toBe('completed');
    });

    it('should reject invalid statuses', () => {
      expect(() => educationStatusSchema.parse('ongoing')).toThrow();
      expect(() => educationStatusSchema.parse('finished')).toThrow();
    });
  });

  describe('profileSchema', () => {
    const validProfile = {
      userId: '12345',
      login: 'testuser',
      email: 'test@example.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      ageRange: '25-34',
      educationLevel: 'universitario',
      educationStatus: 'completed',
      role: 'Volunteer',
      legalDisclaimerAccepted: true,
      githubData: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/12345',
        username: 'testuser',
        email: 'test@example.com'
      }
    };

    it('should accept a complete valid profile', () => {
      const result = profileSchema.parse(validProfile);
      expect(result).toEqual(validProfile);
    });

    it('should reject profile with missing required fields', () => {
      const incomplete = { ...validProfile };
      delete incomplete.firstName;
      expect(() => profileSchema.parse(incomplete)).toThrow();
    });

    it('should reject firstName with invalid characters', () => {
      const invalid = { ...validProfile, firstName: 'Juan123' };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should reject lastName with invalid characters', () => {
      const invalid = { ...validProfile, lastName: 'Pérez@#$' };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should reject firstName shorter than 2 characters', () => {
      const invalid = { ...validProfile, firstName: 'J' };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should reject firstName longer than 50 characters', () => {
      const invalid = { ...validProfile, firstName: 'a'.repeat(51) };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should reject invalid email format', () => {
      const invalid = { ...validProfile, email: 'not-an-email' };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should reject if legalDisclaimerAccepted is false', () => {
      const invalid = { ...validProfile, legalDisclaimerAccepted: false };
      expect(() => profileSchema.parse(invalid)).toThrow();
    });

    it('should accept Spanish characters in names', () => {
      const spanish = {
        ...validProfile,
        firstName: 'José María',
        lastName: 'García Núñez'
      };
      const result = profileSchema.parse(spanish);
      expect(result.firstName).toBe('José María');
      expect(result.lastName).toBe('García Núñez');
    });
  });

  describe('profileSchema - Parental Consent Validation', () => {
    const minorProfile = {
      userId: '12345',
      login: 'younguser',
      email: 'young@example.com',
      firstName: 'Ana',
      lastName: 'López',
      ageRange: '14-17',
      educationLevel: 'bachillerato',
      educationStatus: 'in-progress',
      legalDisclaimerAccepted: true,
      githubData: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/12345',
        username: 'younguser',
        email: 'young@example.com'
      }
    };

    it('should require parental consent for age range 14-17', () => {
      expect(() => profileSchema.parse(minorProfile)).toThrow('consentimiento parental');
    });

    it('should accept minor profile with parental consent', () => {
      const withConsent = { ...minorProfile, parentalConsentConfirmed: true };
      const result = profileSchema.parse(withConsent);
      expect(result.parentalConsentConfirmed).toBe(true);
    });

    it('should not require parental consent for age 18+', () => {
      const adult = { ...minorProfile, ageRange: '18-24' };
      const result = profileSchema.parse(adult);
      expect(result).toBeDefined();
    });
  });

  describe('profileUpdateSchema', () => {
    it('should accept partial profile updates', () => {
      const update = {
        userId: '12345',
        firstName: 'Juan Carlos',
        educationLevel: 'posgrado'
      };
      const result = profileUpdateSchema.parse(update);
      expect(result.firstName).toBe('Juan Carlos');
      expect(result.educationLevel).toBe('posgrado');
    });

    it('should require userId for updates', () => {
      const update = { firstName: 'Juan' };
      expect(() => profileUpdateSchema.parse(update)).toThrow();
    });

    it('should not allow updating immutable fields', () => {
      const update = {
        userId: '12345',
        email: 'newemail@example.com',
        firstName: 'Juan'
      };
      // Schema omits email, so it should be ignored
      const result = profileUpdateSchema.parse(update);
      expect(result.email).toBeUndefined();
    });
  });

  describe('profileRecordSchema', () => {
    const validRecord = {
      userId: '12345',
      login: 'testuser',
      email: 'test@example.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      ageRange: '25-34',
      educationLevel: 'universitario',
      educationStatus: 'completed',
      legalDisclaimerAccepted: true,
      githubData: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/12345',
        username: 'testuser',
        email: 'test@example.com'
      },
      version: 1,
      createdAt: '2026-01-24T20:00:00.000Z',
      updatedAt: '2026-01-24T20:00:00.000Z',
      profileComplete: true,
      legalDisclaimerAcceptedAt: '2026-01-24T20:00:00.000Z'
    };

    it('should accept valid profile record with metadata', () => {
      const result = profileRecordSchema.parse(validRecord);
      expect(result.version).toBe(1);
      expect(result.profileComplete).toBe(true);
    });

    it('should reject record with invalid version', () => {
      const invalid = { ...validRecord, version: 0 };
      expect(() => profileRecordSchema.parse(invalid)).toThrow();
    });

    it('should reject record with invalid datetime format', () => {
      const invalid = { ...validRecord, createdAt: 'not-a-date' };
      expect(() => profileRecordSchema.parse(invalid)).toThrow();
    });

    it('should accept record with deleted flag', () => {
      const deleted = { ...validRecord, deleted: true };
      const result = profileRecordSchema.parse(deleted);
      expect(result.deleted).toBe(true);
    });
  });

  describe('deletionRecordSchema', () => {
    it('should accept valid deletion record', () => {
      const deletion = {
        deleted: true,
        deletedAt: '2026-01-24T21:00:00.000Z',
        deletedBy: '12345'
      };
      const result = deletionRecordSchema.parse(deletion);
      expect(result.deleted).toBe(true);
    });

    it('should require deleted to be true', () => {
      const invalid = {
        deleted: false,
        deletedAt: '2026-01-24T21:00:00.000Z',
        deletedBy: '12345'
      };
      expect(() => deletionRecordSchema.parse(invalid)).toThrow();
    });

    it('should require all fields', () => {
      const incomplete = {
        deleted: true,
        deletedAt: '2026-01-24T21:00:00.000Z'
      };
      expect(() => deletionRecordSchema.parse(incomplete)).toThrow();
    });
  });
});
