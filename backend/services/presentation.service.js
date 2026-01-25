import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

/**
 * PresentationService - Manage presentations in DynamoDB
 * 
 * Data structure:
 * - PRESENTATION#{id}: Full presentation data
 * - USER_PRESENTATIONS#{userId}: List of user's presentations
 */
export class PresentationService {
  
  /**
   * Save presentation to DynamoDB
   */
  static async savePresentation(data) {
    const presentationId = data.presentationId;
    const userId = data.userId;
    const timestamp = new Date().toISOString();
    
    // 1. Save full presentation
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `PRESENTATION#${presentationId}`,
        presentationId: presentationId,
        userId: userId,
        title: data.title,
        description: data.description,
        slides: data.slides,
        html: data.html,
        metadata: data.metadata,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    }));
    
    // 2. Add to user's presentation list
    await this.addToUserList(userId, {
      id: presentationId,
      title: data.title,
      slideCount: data.metadata.slideCount,
      theme: data.metadata.theme,
      createdAt: timestamp
    });
    
    return presentationId;
  }
  
  /**
   * Get presentation by ID
   */
  static async getPresentation(presentationId) {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `PRESENTATION#${presentationId}` }
    }));
    
    return result.Item || null;
  }
  
  /**
   * Get all presentations for a user
   */
  static async getUserPresentations(userId) {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `USER_PRESENTATIONS#${userId}` }
    }));
    
    return result.Item?.presentations || [];
  }
  
  /**
   * Delete presentation
   */
  static async deletePresentation(presentationId, userId) {
    // 1. Delete presentation
    await docClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: `PRESENTATION#${presentationId}` }
    }));
    
    // 2. Remove from user's list
    await this.removeFromUserList(userId, presentationId);
    
    return { success: true };
  }
  
  /**
   * Add presentation to user's list
   */
  static async addToUserList(userId, presentationSummary) {
    const userListKey = `USER_PRESENTATIONS#${userId}`;
    
    // Get current list
    const current = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userListKey }
    }));
    
    const presentations = current.Item?.presentations || [];
    presentations.unshift(presentationSummary); // Add to beginning
    
    // Update list
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userListKey,
        userId: userId,
        presentations: presentations,
        updatedAt: new Date().toISOString()
      }
    }));
  }
  
  /**
   * Remove presentation from user's list
   */
  static async removeFromUserList(userId, presentationId) {
    const userListKey = `USER_PRESENTATIONS#${userId}`;
    
    const current = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userListKey }
    }));
    
    const presentations = (current.Item?.presentations || [])
      .filter(p => p.id !== presentationId);
    
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userListKey,
        userId: userId,
        presentations: presentations,
        updatedAt: new Date().toISOString()
      }
    }));
  }
  
  /**
   * Update presentation metadata
   */
  static async updatePresentation(presentationId, updates) {
    const presentation = await this.getPresentation(presentationId);
    if (!presentation) {
      throw new Error('Presentation not found');
    }
    
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        ...presentation,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }));
    
    return { success: true };
  }
}
