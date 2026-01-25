/**
 * Test DynamoDB Connection
 * Simple endpoint to verify DynamoDB credentials and connection
 */

import { docClient, TABLE_NAME } from "../lib/dynamodb.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export default async function handler(req, res) {
  try {
    // Log environment variables (without exposing secrets)
    console.log('Environment check:', {
      hasRegion: !!process.env.AWS_REGION,
      hasRoleArn: !!process.env.AWS_ROLE_ARN,
      hasTableName: !!process.env.DYNAMODB_TABLE_NAME,
      region: process.env.AWS_REGION,
      tableName: process.env.DYNAMODB_TABLE_NAME
    });

    // Try to scan the table (limit 1 item)
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      Limit: 1
    }));

    return res.status(200).json({
      success: true,
      message: 'DynamoDB connection successful',
      itemCount: result.Count,
      scannedCount: result.ScannedCount,
      tableName: TABLE_NAME
    });
  } catch (error) {
    console.error('DynamoDB connection error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      errorName: error.name,
      errorCode: error.code || 'UNKNOWN'
    });
  }
}
