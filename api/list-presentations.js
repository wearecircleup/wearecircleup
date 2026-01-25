/**
 * Vercel Serverless Function: List User Presentations
 * 
 * Returns all presentations for a user from DynamoDB
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);
const PRESENTATIONS_TABLE = process.env.DYNAMODB_PRESENTATIONS_TABLE_NAME;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    console.log(`Fetching presentations for user: ${userId}`);

    const result = await docClient.send(new GetCommand({
      TableName: PRESENTATIONS_TABLE,
      Key: { PK: userId }
    }));
    
    const presentations = result.Item?.presentations || [];

    return res.status(200).json({
      success: true,
      presentations: presentations,
      count: presentations.length
    });

  } catch (error) {
    console.error('Error fetching presentations:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
