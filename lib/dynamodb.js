/**
 * DynamoDB Client Configuration
 * 
 * Uses Vercel OIDC credentials provider for secure AWS access
 * No need for hardcoded AWS credentials - Vercel handles authentication
 * 
 * Environment Variables Required:
 * - AWS_REGION: AWS region (e.g., us-east-1)
 * - AWS_ROLE_ARN: IAM role ARN with DynamoDB permissions
 * - DYNAMODB_TABLE_NAME: Name of the DynamoDB table
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

// Create DynamoDB client with OIDC credentials
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN,
    clientConfig: { region: process.env.AWS_REGION },
  }),
});

// Create Document Client for easier JSON operations
export const docClient = DynamoDBDocumentClient.from(client);

// Export table name for use in operations
export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
