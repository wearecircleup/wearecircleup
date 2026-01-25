/**
 * Vercel Serverless Function: Update Presentation
 * 
 * Updates an existing presentation in DynamoDB
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, presentationId, updatedPresentation } = req.body;

    if (!userId || !presentationId || !updatedPresentation) {
      return res.status(400).json({ 
        error: 'userId, presentationId, and updatedPresentation are required' 
      });
    }

    // Validate updated presentation structure
    if (!updatedPresentation.id || !updatedPresentation.title || !Array.isArray(updatedPresentation.slides)) {
      return res.status(400).json({ 
        error: 'Invalid presentation structure: must contain id, title, and slides array' 
      });
    }

    // Validate slides
    for (let i = 0; i < updatedPresentation.slides.length; i++) {
      const slide = updatedPresentation.slides[i];
      if ((!slide.message && !slide.title) || (!slide.explanation && !slide.content)) {
        return res.status(400).json({ 
          error: `Invalid slide ${i + 1}: must contain message/title and explanation/content` 
        });
      }
    }

    console.log(`Updating presentation: ${presentationId} for user: ${userId}`);

    // Get current presentations
    const result = await docClient.send(new GetCommand({
      TableName: PRESENTATIONS_TABLE,
      Key: { PK: userId }
    }));

    console.log('DynamoDB result:', JSON.stringify(result.Item, null, 2));

    const presentations = result.Item?.presentations || [];
    console.log(`Found ${presentations.length} presentations for user ${userId}`);
    console.log('Presentation IDs:', presentations.map(p => p.id));
    
    const presentationIndex = presentations.findIndex(p => p.id === presentationId);
    console.log(`Looking for presentationId: ${presentationId}, found at index: ${presentationIndex}`);

    if (presentationIndex === -1) {
      return res.status(404).json({ 
        error: 'Presentation not found',
        debug: {
          userId,
          presentationId,
          availableIds: presentations.map(p => p.id)
        }
      });
    }

    // Update the presentation while preserving metadata
    presentations[presentationIndex] = {
      ...presentations[presentationIndex],
      ...updatedPresentation,
      id: presentationId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    // Save back to DynamoDB
    await docClient.send(new PutCommand({
      TableName: PRESENTATIONS_TABLE,
      Item: {
        PK: userId,
        presentations: presentations
      }
    }));

    return res.status(200).json({
      success: true,
      message: 'Presentación actualizada exitosamente',
      presentation: presentations[presentationIndex]
    });

  } catch (error) {
    console.error('Error updating presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
