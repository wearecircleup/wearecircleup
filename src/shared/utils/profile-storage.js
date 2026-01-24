/**
 * Profile Storage Service - NDJSON Data Lake for Vercel Blob
 * 
 * This service manages profile data in a structured data lake format using NDJSON.
 * Each user has their own NDJSON file with versioned records for audit trail.
 * 
 * Data Lake Structure:
 * /profiles/{userId}.ndjson - Append-only versioned profile records
 * 
 * NDJSON Format Benefits:
 * - Append-only (no file locking issues)
 * - Version history preservation
 * - Efficient line-by-line processing
 * - Streaming support for analytics
 * - Scalable to millions of records
 */

/**
 * NDJSON utilities for data lake operations
 */
export class NDJSONUtils {
  /**
   * Parse NDJSON content into array of records
   * Each line is a separate JSON object
   */
  static parse(content) {
    if (!content || content.trim() === '') {
      return [];
    }
    
    return content
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error('Failed to parse NDJSON line:', line, error);
          throw new Error('Invalid NDJSON format');
        }
      });
  }

  /**
   * Serialize record to NDJSON line (with newline)
   */
  static serialize(record) {
    return JSON.stringify(record) + '\n';
  }

  /**
   * Append record to existing NDJSON content
   */
  static append(existingContent, record) {
    return existingContent + this.serialize(record);
  }

  /**
   * Get the latest non-deleted record from NDJSON array
   */
  static getLatest(records) {
    const validRecords = records.filter(r => !r.deleted);
    return validRecords.length > 0 ? validRecords[validRecords.length - 1] : null;
  }

  /**
   * Get all versions of a record (excluding deleted)
   */
  static getAllVersions(records) {
    return records.filter(r => !r.deleted);
  }

  /**
   * Check if record is marked as deleted
   */
  static isDeleted(records) {
    if (records.length === 0) return false;
    const lastRecord = records[records.length - 1];
    return lastRecord.deleted === true;
  }
}

/**
 * Profile Storage Service for Vercel Blob
 * 
 * Note: This service provides utilities for NDJSON operations.
 * Actual Vercel Blob operations (put, list, del) are handled in the API layer
 * to keep the frontend lightweight and secure.
 */
export class ProfileStorageService {
  /**
   * Generate storage pathname for user profile
   */
  static getProfilePath(userId) {
    return `profiles/${userId}.ndjson`;
  }

  /**
   * Parse profile NDJSON content and get latest version
   */
  static parseProfileContent(content) {
    const records = NDJSONUtils.parse(content);
    
    // Check if profile is deleted
    if (NDJSONUtils.isDeleted(records)) {
      return null;
    }
    
    // Get latest profile record (filter out deletion records)
    const profileRecords = records.filter(r => r.userId && !r.deleted);
    
    return NDJSONUtils.getLatest(profileRecords);
  }

  /**
   * Get all profile versions (for audit trail)
   */
  static getAllProfileVersions(content) {
    const records = NDJSONUtils.parse(content);
    const profileRecords = records.filter(r => r.userId && !r.deleted);
    return NDJSONUtils.getAllVersions(profileRecords);
  }

  /**
   * Create new profile record with metadata
   */
  static createProfileRecord(profile) {
    const now = new Date().toISOString();
    
    return {
      ...profile,
      version: 1,
      createdAt: now,
      updatedAt: now,
      profileComplete: true,
      legalDisclaimerAcceptedAt: now
    };
  }

  /**
   * Create updated profile record (increments version)
   */
  static createUpdatedRecord(currentRecord, updates) {
    return {
      ...currentRecord,
      ...updates,
      version: currentRecord.version + 1,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Create deletion record for soft delete
   */
  static createDeletionRecord(userId) {
    return {
      deleted: true,
      deletedAt: new Date().toISOString(),
      deletedBy: userId
    };
  }

  /**
   * Serialize profile record to NDJSON line
   */
  static serializeRecord(record) {
    return NDJSONUtils.serialize(record);
  }

  /**
   * Append profile record to existing content
   */
  static appendRecord(existingContent, record) {
    return NDJSONUtils.append(existingContent, record);
  }

  /**
   * Validate NDJSON content structure
   */
  static validateContent(content) {
    try {
      const records = NDJSONUtils.parse(content);
      
      if (records.length === 0) {
        return { valid: true };
      }
      
      // Check that all records are valid JSON
      for (const record of records) {
        if (typeof record !== 'object' || record === null) {
          return { valid: false, error: 'Invalid record format' };
        }
      }
      
      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get analytics metadata from profile content
   * Useful for data lake queries
   */
  static getAnalyticsMetadata(content) {
    const records = NDJSONUtils.parse(content);
    
    if (records.length === 0) {
      return {
        totalVersions: 0,
        firstCreated: null,
        lastUpdated: null,
        isDeleted: false
      };
    }
    
    const profileRecords = records.filter(r => r.userId);
    const latest = NDJSONUtils.getLatest(profileRecords);
    const isDeleted = NDJSONUtils.isDeleted(records);
    
    return {
      totalVersions: profileRecords.length,
      firstCreated: profileRecords[0]?.createdAt || null,
      lastUpdated: latest?.updatedAt || null,
      isDeleted,
      ageRange: latest?.ageRange,
      educationLevel: latest?.educationLevel
    };
  }
}
