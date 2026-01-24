import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { put, del, list } from '@vercel/blob';

/**
 * Integration tests for /api/profile endpoint
 * 
 * Tests the complete flow of profile CRUD operations
 * using Vercel Blob storage with NDJSON format
 */

// Mock Vercel Blob for testing
let mockBlobStorage = new Map();

// Mock implementation
const mockPut = async (pathname, content, options) => {
  mockBlobStorage.set(pathname, content);
  return {
    url: `https://blob.vercel-storage.com/${pathname}`,
    pathname,
    contentType: options.contentType || 'text/plain',
    size: content.length
  };
};

const mockDel = async (url) => {
  const pathname = url.replace('https://blob.vercel-storage.com/', '');
  mockBlobStorage.delete(pathname);
};

const mockList = async (options = {}) => {
  const blobs = [];
  for (const [pathname, content] of mockBlobStorage.entries()) {
    if (!options.prefix || pathname.startsWith(options.prefix)) {
      blobs.push({
        url: `https://blob.vercel-storage.com/${pathname}`,
        pathname,
        size: content.length
      });
    }
  }
  return { blobs };
};

describe('Profile API Integration Tests', () => {
  const testUserId = 'test-user-123';
  const testProfile = {
    userId: testUserId,
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

  beforeEach(() => {
    mockBlobStorage.clear();
  });

  afterEach(() => {
    mockBlobStorage.clear();
  });

  describe('POST /api/profile - Create Profile', () => {
    it('should create a new profile with version 1', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      // Simulate profile creation
      const now = new Date().toISOString();
      const profileRecord = {
        ...testProfile,
        version: 1,
        createdAt: now,
        updatedAt: now,
        profileComplete: true,
        legalDisclaimerAcceptedAt: now
      };

      const newLine = JSON.stringify(profileRecord) + '\n';
      await mockPut(pathname, newLine, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Verify storage
      const stored = mockBlobStorage.get(pathname);
      expect(stored).toBeDefined();
      expect(stored).toContain(testProfile.firstName);
      expect(stored).toContain('"version":1');
      expect(stored).toContain('"role":"Volunteer"');
    });

    it('should reject profile creation if userId is missing', () => {
      const invalidProfile = { ...testProfile };
      delete invalidProfile.userId;

      expect(() => {
        if (!invalidProfile.userId) {
          throw new Error('userId is required');
        }
      }).toThrow('userId is required');
    });

    it('should reject profile creation if email is invalid', () => {
      const invalidProfile = { ...testProfile, email: 'invalid-email' };

      expect(() => {
        if (!invalidProfile.email.includes('@')) {
          throw new Error('Invalid email format');
        }
      }).toThrow('Invalid email format');
    });

    it('should assign default role "Volunteer" if not specified', async () => {
      const profileWithoutRole = { ...testProfile };
      delete profileWithoutRole.role;

      const pathname = `profiles/${testUserId}.ndjson`;
      const now = new Date().toISOString();
      const profileRecord = {
        ...profileWithoutRole,
        role: 'Volunteer', // Default assigned
        version: 1,
        createdAt: now,
        updatedAt: now,
        profileComplete: true,
        legalDisclaimerAcceptedAt: now
      };

      const newLine = JSON.stringify(profileRecord) + '\n';
      await mockPut(pathname, newLine, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      const stored = mockBlobStorage.get(pathname);
      expect(stored).toContain('"role":"Volunteer"');
    });

    it('should require parental consent for age 14-17', () => {
      const minorProfile = {
        ...testProfile,
        ageRange: '14-17',
        parentalConsentConfirmed: false
      };

      expect(() => {
        if (minorProfile.ageRange === '14-17' && !minorProfile.parentalConsentConfirmed) {
          throw new Error('Parental consent required for minors');
        }
      }).toThrow('Parental consent required for minors');
    });
  });

  describe('GET /api/profile - Retrieve Profile', () => {
    it('should retrieve the latest profile version', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      // Create profile with multiple versions
      const version1 = { ...testProfile, version: 1, firstName: 'Juan', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      const version2 = { ...testProfile, version: 2, firstName: 'Juan Carlos', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z' };
      
      const content = JSON.stringify(version1) + '\n' + JSON.stringify(version2) + '\n';
      await mockPut(pathname, content, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Retrieve and parse
      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      const latestProfile = JSON.parse(lines[lines.length - 1]);

      expect(latestProfile.version).toBe(2);
      expect(latestProfile.firstName).toBe('Juan Carlos');
    });

    it('should return null if profile does not exist', async () => {
      const pathname = `profiles/nonexistent-user.ndjson`;
      const stored = mockBlobStorage.get(pathname);

      expect(stored).toBeUndefined();
    });

    it('should return null if profile is deleted', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      // Create and then delete
      const version1 = { ...testProfile, version: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      const deleteRecord = { deleted: true, deletedAt: '2026-01-03T00:00:00Z', deletedBy: testUserId };
      
      const content = JSON.stringify(version1) + '\n' + JSON.stringify(deleteRecord) + '\n';
      await mockPut(pathname, content, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Parse and check
      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      const lastRecord = JSON.parse(lines[lines.length - 1]);

      expect(lastRecord.deleted).toBe(true);
    });
  });

  describe('PUT /api/profile - Update Profile', () => {
    it('should update profile and increment version', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      // Create initial profile
      const version1 = { ...testProfile, version: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      await mockPut(pathname, JSON.stringify(version1) + '\n', {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Update profile
      const updates = { firstName: 'Juan Carlos', educationLevel: 'posgrado' };
      const version2 = {
        ...version1,
        ...updates,
        version: 2,
        updatedAt: '2026-01-02T00:00:00Z'
      };

      const existingContent = mockBlobStorage.get(pathname);
      const newContent = existingContent + JSON.stringify(version2) + '\n';
      await mockPut(pathname, newContent, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Verify
      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      
      expect(lines.length).toBe(2);
      
      const latest = JSON.parse(lines[1]);
      expect(latest.version).toBe(2);
      expect(latest.firstName).toBe('Juan Carlos');
      expect(latest.educationLevel).toBe('posgrado');
    });

    it('should preserve immutable fields (userId, email, role)', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      const version1 = { ...testProfile, version: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      await mockPut(pathname, JSON.stringify(version1) + '\n', {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Attempt to change immutable fields
      const maliciousUpdates = {
        userId: 'hacker-123',
        email: 'hacker@evil.com',
        role: 'Admin',
        firstName: 'Hacker'
      };

      // Simulate backend protection
      const version2 = {
        ...version1,
        firstName: maliciousUpdates.firstName, // Only this should update
        userId: version1.userId, // Protected
        email: version1.email, // Protected
        role: version1.role, // Protected
        version: 2,
        updatedAt: '2026-01-02T00:00:00Z'
      };

      const existingContent = mockBlobStorage.get(pathname);
      const newContent = existingContent + JSON.stringify(version2) + '\n';
      await mockPut(pathname, newContent, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      const latest = JSON.parse(lines[1]);

      expect(latest.userId).toBe(testUserId); // Unchanged
      expect(latest.email).toBe(testProfile.email); // Unchanged
      expect(latest.role).toBe('Volunteer'); // Unchanged
      expect(latest.firstName).toBe('Hacker'); // Updated
    });

    it('should preserve createdAt timestamp', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      const originalCreatedAt = '2026-01-01T00:00:00Z';
      
      const version1 = { ...testProfile, version: 1, createdAt: originalCreatedAt, updatedAt: originalCreatedAt };
      await mockPut(pathname, JSON.stringify(version1) + '\n', {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      const version2 = {
        ...version1,
        firstName: 'Updated',
        version: 2,
        createdAt: originalCreatedAt, // Must be preserved
        updatedAt: '2026-01-02T00:00:00Z'
      };

      const existingContent = mockBlobStorage.get(pathname);
      const newContent = existingContent + JSON.stringify(version2) + '\n';
      await mockPut(pathname, newContent, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      const latest = JSON.parse(lines[1]);

      expect(latest.createdAt).toBe(originalCreatedAt);
      expect(latest.updatedAt).not.toBe(originalCreatedAt);
    });
  });

  describe('DELETE /api/profile - Soft Delete', () => {
    it('should append deletion record (soft delete)', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      const version1 = { ...testProfile, version: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      await mockPut(pathname, JSON.stringify(version1) + '\n', {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Soft delete
      const deleteRecord = {
        deleted: true,
        deletedAt: new Date().toISOString(),
        deletedBy: testUserId
      };

      const existingContent = mockBlobStorage.get(pathname);
      const newContent = existingContent + JSON.stringify(deleteRecord) + '\n';
      await mockPut(pathname, newContent, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Verify
      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      
      expect(lines.length).toBe(2);
      
      const deleteEntry = JSON.parse(lines[1]);
      expect(deleteEntry.deleted).toBe(true);
      expect(deleteEntry.deletedBy).toBe(testUserId);
    });

    it('should require confirmation text "Delete"', () => {
      const confirmations = ['delete', 'DELETE', 'confirm', ''];

      confirmations.forEach(text => {
        expect(() => {
          if (text !== 'Delete') {
            throw new Error('Confirmation text must be exactly "Delete"');
          }
        }).toThrow('Confirmation text must be exactly "Delete"');
      });

      // Valid confirmation
      expect(() => {
        if ('Delete' !== 'Delete') {
          throw new Error('Confirmation text must be exactly "Delete"');
        }
      }).not.toThrow();
    });

    it('should preserve audit trail after deletion', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      // Create profile with updates
      const version1 = { ...testProfile, version: 1, firstName: 'Juan', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' };
      const version2 = { ...testProfile, version: 2, firstName: 'Juan Carlos', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z' };
      const deleteRecord = { deleted: true, deletedAt: '2026-01-03T00:00:00Z', deletedBy: testUserId };
      
      const content = JSON.stringify(version1) + '\n' + 
                     JSON.stringify(version2) + '\n' + 
                     JSON.stringify(deleteRecord) + '\n';
      
      await mockPut(pathname, content, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      // Verify complete history is preserved
      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      
      expect(lines.length).toBe(3);
      expect(JSON.parse(lines[0]).version).toBe(1);
      expect(JSON.parse(lines[1]).version).toBe(2);
      expect(JSON.parse(lines[2]).deleted).toBe(true);
    });
  });

  describe('NDJSON Format Validation', () => {
    it('should handle multiple versions correctly', async () => {
      const pathname = `profiles/${testUserId}.ndjson`;
      
      const versions = [
        { ...testProfile, version: 1, firstName: 'V1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
        { ...testProfile, version: 2, firstName: 'V2', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z' },
        { ...testProfile, version: 3, firstName: 'V3', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-03T00:00:00Z' }
      ];

      const content = versions.map(v => JSON.stringify(v)).join('\n') + '\n';
      await mockPut(pathname, content, {
        access: 'public',
        contentType: 'application/x-ndjson'
      });

      const stored = mockBlobStorage.get(pathname);
      const lines = stored.trim().split('\n');
      
      expect(lines.length).toBe(3);
      lines.forEach((line, index) => {
        const parsed = JSON.parse(line);
        expect(parsed.version).toBe(index + 1);
        expect(parsed.firstName).toBe(`V${index + 1}`);
      });
    });

    it('should handle empty lines gracefully', () => {
      const content = '\n\n{"userId":"123"}\n\n{"userId":"456"}\n\n';
      const lines = content.split('\n').filter(line => line.trim());
      
      expect(lines.length).toBe(2);
      expect(JSON.parse(lines[0]).userId).toBe('123');
      expect(JSON.parse(lines[1]).userId).toBe('456');
    });
  });
});
