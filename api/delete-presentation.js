/**
 * Vercel Serverless Function: Delete Presentation
 * 
 * Deletes presentation from DynamoDB
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { presentationId, userId } = req.body;

    if (!presentationId || !userId) {
      return res.status(400).json({ error: 'Missing required fields: presentationId, userId' });
    }

    console.log(`Deleting presentation: ${presentationId} for user: ${userId}`);

    // Get current presentations
    const current = await docClient.send(new GetCommand({
      TableName: PRESENTATIONS_TABLE,
      Key: { PK: userId }
    }));
    
    // Remove presentation from array
    const presentations = (current.Item?.presentations || [])
      .filter(p => p.id !== presentationId);
    
    // Update user's presentations
    await docClient.send(new PutCommand({
      TableName: PRESENTATIONS_TABLE,
      Item: {
        PK: userId,
        userId: userId,
        presentations: presentations,
        updatedAt: new Date().toISOString()
      }
    }));

    console.log(`Presentation deleted successfully: ${presentationId}`);

    return res.status(200).json({
      success: true,
      message: 'Presentación eliminada correctamente'
    });

  } catch (error) {
    console.error('Error deleting presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
