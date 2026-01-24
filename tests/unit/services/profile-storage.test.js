import { describe, it, expect } from 'vitest';
import { NDJSONUtils, ProfileStorageService } from '@shared/utils/profile-storage';

describe('ProfileStorageService - Unit Tests', () => {
  
  describe('NDJSONUtils', () => {
    describe('parse', () => {
      it('should parse valid NDJSON content', () => {
        const content = '{"id":"1","name":"Test"}\n{"id":"2","name":"Test2"}\n';
        const result = NDJSONUtils.parse(content);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ id: '1', name: 'Test' });
        expect(result[1]).toEqual({ id: '2', name: 'Test2' });
      });

      it('should handle empty content', () => {
        expect(NDJSONUtils.parse('')).toEqual([]);
        expect(NDJSONUtils.parse('   ')).toEqual([]);
      });

      it('should filter empty lines', () => {
        const content = '{"id":"1"}\n\n{"id":"2"}\n';
        const result = NDJSONUtils.parse(content);
        expect(result).toHaveLength(2);
      });

      it('should throw on invalid JSON', () => {
        const content = '{"id":"1"}\n{invalid json}\n';
        expect(() => NDJSONUtils.parse(content)).toThrow('Invalid NDJSON format');
      });
    });

    describe('serialize', () => {
      it('should serialize object to NDJSON line', () => {
        const record = { id: '1', name: 'Test' };
        const result = NDJSONUtils.serialize(record);
        expect(result).toBe('{"id":"1","name":"Test"}\n');
      });

      it('should handle complex objects', () => {
        const record = { 
          id: '1', 
          nested: { value: 'test' },
          array: [1, 2, 3]
        };
        const result = NDJSONUtils.serialize(record);
        expect(result).toContain('"nested":{"value":"test"}');
        expect(result).toContain('"array":[1,2,3]');
        expect(result).toEndWith('\n');
      });
    });

    describe('append', () => {
      it('should append record to existing content', () => {
        const existing = '{"id":"1"}\n';
        const newRecord = { id: '2' };
        const result = NDJSONUtils.append(existing, newRecord);
        expect(result).toBe('{"id":"1"}\n{"id":"2"}\n');
      });

      it('should append to empty content', () => {
        const result = NDJSONUtils.append('', { id: '1' });
        expect(result).toBe('{"id":"1"}\n');
      });
    });

    describe('getLatest', () => {
      it('should return latest non-deleted record', () => {
        const records = [
          { id: '1', version: 1, deleted: false },
          { id: '1', version: 2, deleted: false },
          { id: '1', version: 3, deleted: false }
        ];
        const result = NDJSONUtils.getLatest(records);
        expect(result).toEqual({ id: '1', version: 3, deleted: false });
      });

      it('should filter out deleted records', () => {
        const records = [
          { id: '1', version: 1 },
          { id: '1', version: 2 },
          { id: '1', version: 3, deleted: true }
        ];
        const result = NDJSONUtils.getLatest(records);
        expect(result).toEqual({ id: '1', version: 2 });
      });

      it('should return null for empty array', () => {
        expect(NDJSONUtils.getLatest([])).toBeNull();
      });

      it('should return null if all records are deleted', () => {
        const records = [
          { id: '1', deleted: true },
          { id: '1', deleted: true }
        ];
        expect(NDJSONUtils.getLatest(records)).toBeNull();
      });
    });

    describe('isDeleted', () => {
      it('should return true if last record is deleted', () => {
        const records = [
          { id: '1', version: 1 },
          { deleted: true }
        ];
        expect(NDJSONUtils.isDeleted(records)).toBe(true);
      });

      it('should return false if last record is not deleted', () => {
        const records = [
          { id: '1', version: 1 },
          { id: '1', version: 2 }
        ];
        expect(NDJSONUtils.isDeleted(records)).toBe(false);
      });

      it('should return false for empty array', () => {
        expect(NDJSONUtils.isDeleted([])).toBe(false);
      });
    });
  });

  describe('ProfileStorageService', () => {
    describe('getProfilePath', () => {
      it('should generate correct profile path', () => {
        expect(ProfileStorageService.getProfilePath('12345')).toBe('profiles/12345.ndjson');
        expect(ProfileStorageService.getProfilePath('user-abc')).toBe('profiles/user-abc.ndjson');
      });
    });

    describe('parseProfileContent', () => {
      it('should parse and return latest profile', () => {
        const content = `{"userId":"1","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"userId":"1","firstName":"Juan Carlos","version":2,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T21:00:00.000Z"}
`;
        const result = ProfileStorageService.parseProfileContent(content);
        expect(result).toBeDefined();
        expect(result?.firstName).toBe('Juan Carlos');
        expect(result?.version).toBe(2);
      });

      it('should return null for deleted profile', () => {
        const content = `{"userId":"1","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"deleted":true,"deletedAt":"2026-01-24T22:00:00.000Z","deletedBy":"1"}
`;
        const result = ProfileStorageService.parseProfileContent(content);
        expect(result).toBeNull();
      });

      it('should return null for empty content', () => {
        expect(ProfileStorageService.parseProfileContent('')).toBeNull();
      });
    });

    describe('getAllProfileVersions', () => {
      it('should return all non-deleted versions', () => {
        const content = `{"userId":"1","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"userId":"1","firstName":"Juan Carlos","version":2,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T21:00:00.000Z"}
{"userId":"1","firstName":"Juan Carlos María","version":3,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T22:00:00.000Z"}
`;
        const result = ProfileStorageService.getAllProfileVersions(content);
        expect(result).toHaveLength(3);
        expect(result[0].version).toBe(1);
        expect(result[1].version).toBe(2);
        expect(result[2].version).toBe(3);
      });

      it('should exclude deletion records', () => {
        const content = `{"userId":"1","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"deleted":true,"deletedAt":"2026-01-24T22:00:00.000Z","deletedBy":"1"}
`;
        const result = ProfileStorageService.getAllProfileVersions(content);
        expect(result).toHaveLength(1);
      });
    });

    describe('createProfileRecord', () => {
      it('should create profile record with metadata', () => {
        const profile = {
          userId: '12345',
          login: 'testuser',
          email: 'test@example.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          ageRange: '25-34' as const,
          educationLevel: 'universitario' as const,
          educationStatus: 'completed' as const,
          legalDisclaimerAccepted: true as const,
          githubData: {
            avatarUrl: 'https://example.com/avatar.jpg',
            username: 'testuser',
            email: 'test@example.com'
          }
        };

        const result = ProfileStorageService.createProfileRecord(profile);
        
        expect(result.version).toBe(1);
        expect(result.profileComplete).toBe(true);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.legalDisclaimerAcceptedAt).toBeDefined();
        expect(result.firstName).toBe('Juan');
      });

      it('should set timestamps to current time', () => {
        const before = new Date().toISOString();
        
        const profile = {
          userId: '12345',
          login: 'testuser',
          email: 'test@example.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          ageRange: '25-34' as const,
          educationLevel: 'universitario' as const,
          educationStatus: 'completed' as const,
          legalDisclaimerAccepted: true as const,
          githubData: {
            avatarUrl: 'https://example.com/avatar.jpg',
            username: 'testuser',
            email: 'test@example.com'
          }
        };

        const result = ProfileStorageService.createProfileRecord(profile);
        const after = new Date().toISOString();
        
        expect(result.createdAt >= before).toBe(true);
        expect(result.createdAt <= after).toBe(true);
      });
    });

    describe('createUpdatedRecord', () => {
      it('should increment version and update timestamp', () => {
        const currentRecord = {
          userId: '12345',
          login: 'testuser',
          email: 'test@example.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          ageRange: '25-34' as const,
          educationLevel: 'universitario' as const,
          educationStatus: 'completed' as const,
          legalDisclaimerAccepted: true as const,
          githubData: {
            avatarUrl: 'https://example.com/avatar.jpg',
            username: 'testuser',
            email: 'test@example.com'
          },
          version: 1,
          createdAt: '2026-01-24T20:00:00.000Z',
          updatedAt: '2026-01-24T20:00:00.000Z',
          profileComplete: true,
          legalDisclaimerAcceptedAt: '2026-01-24T20:00:00.000Z'
        };

        const updates = { firstName: 'Juan Carlos' };
        const result = ProfileStorageService.createUpdatedRecord(currentRecord, updates);
        
        expect(result.version).toBe(2);
        expect(result.firstName).toBe('Juan Carlos');
        expect(result.updatedAt).not.toBe(currentRecord.updatedAt);
        expect(result.createdAt).toBe(currentRecord.createdAt);
      });
    });

    describe('createDeletionRecord', () => {
      it('should create deletion record', () => {
        const result = ProfileStorageService.createDeletionRecord('12345');
        
        expect(result.deleted).toBe(true);
        expect(result.deletedBy).toBe('12345');
        expect(result.deletedAt).toBeDefined();
      });
    });

    describe('validateContent', () => {
      it('should validate correct NDJSON content', () => {
        const content = '{"id":"1"}\n{"id":"2"}\n';
        const result = ProfileStorageService.validateContent(content);
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it('should accept empty content', () => {
        const result = ProfileStorageService.validateContent('');
        expect(result.valid).toBe(true);
      });

      it('should reject invalid JSON', () => {
        const content = '{invalid}\n';
        const result = ProfileStorageService.validateContent(content);
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    describe('getAnalyticsMetadata', () => {
      it('should extract analytics metadata', () => {
        const content = `{"userId":"1","firstName":"Juan","ageRange":"25-34","educationLevel":"universitario","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"userId":"1","firstName":"Juan Carlos","ageRange":"25-34","educationLevel":"posgrado","version":2,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T21:00:00.000Z"}
`;
        const result = ProfileStorageService.getAnalyticsMetadata(content);
        
        expect(result.totalVersions).toBe(2);
        expect(result.firstCreated).toBe('2026-01-24T20:00:00.000Z');
        expect(result.lastUpdated).toBe('2026-01-24T21:00:00.000Z');
        expect(result.isDeleted).toBe(false);
        expect(result.ageRange).toBe('25-34');
        expect(result.educationLevel).toBe('posgrado');
      });

      it('should detect deleted profiles', () => {
        const content = `{"userId":"1","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00.000Z","updatedAt":"2026-01-24T20:00:00.000Z"}
{"deleted":true,"deletedAt":"2026-01-24T22:00:00.000Z","deletedBy":"1"}
`;
        const result = ProfileStorageService.getAnalyticsMetadata(content);
        expect(result.isDeleted).toBe(true);
      });

      it('should handle empty content', () => {
        const result = ProfileStorageService.getAnalyticsMetadata('');
        expect(result.totalVersions).toBe(0);
        expect(result.firstCreated).toBeNull();
        expect(result.lastUpdated).toBeNull();
        expect(result.isDeleted).toBe(false);
      });
    });
  });
});
