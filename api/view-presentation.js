/**
 * Vercel Serverless Function: View Presentation
 * 
 * Returns HTML for a presentation to be displayed
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
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
  const { presentationId, userId } = req.query;

  if (!presentationId || !userId) {
    return res.status(400).send('<h1>Error: Presentation ID and User ID required</h1>');
  }

  try {
    const result = await docClient.send(new GetCommand({
      TableName: PRESENTATIONS_TABLE,
      Key: { PK: userId }
    }));
    
    const presentations = result.Item?.presentations || [];
    const presentation = presentations.find(p => p.id === presentationId);

    if (!presentation) {
      return res.status(404).send('<h1>Presentation not found</h1>');
    }

    // Return HTML directly
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(presentation.html);

  } catch (error) {
    console.error('Error viewing presentation:', error);
    return res.status(500).send('<h1>Error loading presentation</h1>');
  }
}
