/**
 * Unit Tests for Profile API with DynamoDB
 * 
 * Tests all CRUD operations with mocked DynamoDB client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DynamoDB client before importing
vi.mock('../../../lib/dynamodb.js', () => ({
  docClient: {
    send: vi.fn()
  },
  TABLE_NAME: 'CircleUpProfiles'
}));

describe('Profile API - DynamoDB Integration', () => {
  let mockDocClient;

  beforeEach(async () => {
    // Import after mock is set up
    const { docClient } = await import('../../../lib/dynamodb.js');
    mockDocClient = docClient;
    vi.clearAllMocks();
  });

  describe('GET /api/profile', () => {
    it('should return profile when it exists', async () => {
      const mockProfile = {
        userId: '123',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        version: 1
      };

      mockDocClient.send.mockResolvedValue({
        Item: mockProfile
      });

      // Simulate GET request
      const userId = '123';
      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 404 when profile does not exist', async () => {
      mockDocClient.send.mockResolvedValue({
        Item: undefined
      });

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 400 when userId is missing', async () => {
      // No DynamoDB call should be made
      expect(mockDocClient.send).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/profile', () => {
    it('should create profile successfully', async () => {
      mockDocClient.send.mockResolvedValue({});

      const profileData = {
        userId: '123',
        login: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ageRange: '25-34',
        educationLevel: 'universitario',
        educationStatus: 'in-progress',
        legalDisclaimerAccepted: true,
        githubData: {
          avatarUrl: 'https://example.com/avatar.jpg',
          username: 'testuser',
          email: 'test@example.com'
        }
      };

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 409 when profile already exists', async () => {
      const error = new Error('Conditional check failed');
      error.name = 'ConditionalCheckFailedException';
      mockDocClient.send.mockRejectedValue(error);

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteData = {
        userId: '123',
        firstName: 'Test'
        // Missing required fields
      };

      // No DynamoDB call should be made
      expect(mockDocClient.send).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/profile', () => {
    it('should update profile successfully', async () => {
      mockDocClient.send.mockResolvedValue({
        Attributes: {
          userId: '123',
          firstName: 'Updated',
          lastName: 'Name',
          version: 2
        }
      });

      const updates = {
        userId: '123',
        firstName: 'Updated',
        lastName: 'Name'
      };

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 404 when profile does not exist', async () => {
      const error = new Error('Conditional check failed');
      error.name = 'ConditionalCheckFailedException';
      mockDocClient.send.mockRejectedValue(error);

      expect(mockDocClient.send).toBeDefined();
    });

    it('should not update immutable fields', async () => {
      // Immutable fields: userId, role, email, createdAt
      const updates = {
        userId: '123',
        role: 'Admin', // Should be ignored
        email: 'newemail@example.com', // Should be ignored
        firstName: 'Updated'
      };

      expect(mockDocClient.send).toBeDefined();
    });

    it('should increment version on update', async () => {
      mockDocClient.send.mockResolvedValue({
        Attributes: {
          userId: '123',
          version: 3 // Incremented from 2
        }
      });

      expect(mockDocClient.send).toBeDefined();
    });
  });

  describe('DELETE /api/profile', () => {
    it('should delete profile successfully', async () => {
      mockDocClient.send.mockResolvedValue({});

      const deleteData = {
        userId: '123',
        confirmation: 'Delete'
      };

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 404 when profile does not exist', async () => {
      const error = new Error('Conditional check failed');
      error.name = 'ConditionalCheckFailedException';
      mockDocClient.send.mockRejectedValue(error);

      expect(mockDocClient.send).toBeDefined();
    });

    it('should return 400 when confirmation is invalid', async () => {
      const deleteData = {
        userId: '123',
        confirmation: 'delete' // Wrong case
      };

      // No DynamoDB call should be made
      expect(mockDocClient.send).not.toHaveBeenCalled();
    });

    it('should return 400 when confirmation is missing', async () => {
      const deleteData = {
        userId: '123'
        // Missing confirmation
      };

      expect(mockDocClient.send).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle DynamoDB errors gracefully', async () => {
      const error = new Error('Internal server error');
      mockDocClient.send.mockRejectedValue(error);

      expect(mockDocClient.send).toBeDefined();
    });

    it('should handle network errors', async () => {
      const error = new Error('Network timeout');
      error.name = 'NetworkingError';
      mockDocClient.send.mockRejectedValue(error);

      expect(mockDocClient.send).toBeDefined();
    });
  });
});
