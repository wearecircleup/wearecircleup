/**
 * Vercel Serverless Function: Save Presentation
 * 
 * Saves a presentation to DynamoDB (used for importing shared presentations)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN,
    clientConfig: { region: process.env.AWS_REGION },
  }),
});
const docClient = DynamoDBDocumentClient.from(client);
const PRESENTATIONS_TABLE = process.env.DYNAMODB_PRESENTATIONS_TABLE_NAME;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, presentation } = req.body;

    if (!userId || !presentation) {
      return res.status(400).json({ error: 'userId and presentation are required' });
    }

    // Validate presentation structure
    if (!presentation.id || !presentation.slides || !Array.isArray(presentation.slides)) {
      return res.status(400).json({ error: 'Invalid presentation structure' });
    }

    console.log(`Saving presentation: ${presentation.id} for user: ${userId}`);

    // Get current presentations
    const result = await docClient.send(new GetCommand({
      TableName: PRESENTATIONS_TABLE,
      Key: { PK: userId }
    }));

    const presentations = result.Item?.presentations || [];
    
    // Check if presentation already exists
    const existingIndex = presentations.findIndex(p => p.id === presentation.id);
    
    if (existingIndex !== -1) {
      // Update existing
      presentations[existingIndex] = presentation;
    } else {
      // Add new
      presentations.unshift(presentation);
    }

    // Save back to DynamoDB
    await docClient.send(new PutCommand({
      TableName: PRESENTATIONS_TABLE,
      Item: {
        PK: userId,
        presentations: presentations,
        updatedAt: new Date().toISOString()
      }
    }));

    console.log(`Successfully saved presentation ${presentation.id}`);

    return res.status(200).json({
      success: true,
      message: 'Presentation saved successfully',
      presentationId: presentation.id
    });

  } catch (error) {
    console.error('Error saving presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
