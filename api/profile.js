/**
 * Vercel Serverless Function - User Profile CRUD Operations
 * 
 * This function handles all profile operations using AWS DynamoDB.
 * No backward compatibility with Vercel Blob - clean migration.
 * 
 * Endpoints:
 * - GET    /api/profile?userId={userId}  - Get user profile
 * - POST   /api/profile                  - Create new profile
 * - PUT    /api/profile                  - Update existing profile
 * - DELETE /api/profile                  - Delete profile (hard delete)
 * 
 * Environment Variables Required:
 * - AWS_REGION: AWS region
 * - AWS_ROLE_ARN: IAM role ARN with DynamoDB permissions
 * - DYNAMODB_TABLE_NAME: DynamoDB table name
 */

import { GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../lib/dynamodb.js";

// CORS headers for frontend access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Main handler for profile API
 */
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        return res.status(405).json({ 
          success: false, 
          error: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('Profile API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
}

/**
 * GET /api/profile?userId={userId}
 * Retrieve user profile from DynamoDB
 */
async function handleGet(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      error: 'userId es requerido' 
    });
  }

  try {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userId }
    }));

    if (!result.Item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      profile: result.Item
    });
  } catch (error) {
    console.error('Error reading profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al leer el perfil' 
    });
  }
}

/**
 * POST /api/profile
 * Create new user profile in DynamoDB
 */
async function handlePost(req, res) {
  const profileData = req.body;

  if (!profileData || !profileData.userId) {
    return res.status(400).json({ 
      success: false, 
      error: 'Datos de perfil con userId son requeridos' 
    });
  }

  try {
    // Validate required fields
    const requiredFields = [
      'userId', 'login', 'email', 'firstName', 'lastName',
      'ageRange', 'educationLevel', 'educationStatus',
      'legalDisclaimerAccepted', 'githubData'
    ];

    for (const field of requiredFields) {
      if (!profileData[field]) {
        return res.status(400).json({ 
          success: false, 
          error: `Campo requerido faltante: ${field}` 
        });
      }
    }

    // Create profile record with metadata
    const now = new Date().toISOString();
    const profileRecord = {
      ...profileData,
      role: profileData.role || 'Volunteer',
      version: 1,
      createdAt: now,
      updatedAt: now,
      profileComplete: true,
      legalDisclaimerAcceptedAt: now
    };

    // Write to DynamoDB with condition to prevent overwrite
    const result = await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: { ...profileRecord, PK: profileRecord.userId },
      ConditionExpression: 'attribute_not_exists(PK)'
    }));

    return res.status(201).json({ 
      success: true, 
      profile: profileRecord,
      message: 'Perfil creado exitosamente' 
    });
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(409).json({ 
        success: false, 
        error: 'El perfil ya existe. Usa PUT para actualizar.' 
      });
    }
    console.error('Error creating profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al crear el perfil' 
    });
  }
}

/**
 * PUT /api/profile
 * Update existing user profile in DynamoDB
 */
async function handlePut(req, res) {
  const updates = req.body;

  if (!updates || !updates.userId) {
    return res.status(400).json({ 
      success: false, 
      error: 'userId es requerido' 
    });
  }

  try {
    const { userId, ...updateFields } = updates;
    
    // Build update expression dynamically
    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    
    // Immutable fields that cannot be updated
    const immutableFields = ['userId', 'role', 'email', 'createdAt', 'legalDisclaimerAcceptedAt'];
    
    Object.keys(updateFields).forEach((key) => {
      if (!immutableFields.includes(key)) {
        updateExpressionParts.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = updateFields[key];
      }
    });
    
    // Always update version and updatedAt
    updateExpressionParts.push('#version = #version + :inc');
    updateExpressionParts.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#version'] = 'version';
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':inc'] = 1;
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    
    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userId },
      UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ConditionExpression: "attribute_exists(PK)",
      ReturnValues: "ALL_NEW"
    }));

    return res.status(200).json({ 
      success: true, 
      profile: result.Attributes,
      message: 'Perfil actualizado exitosamente' 
    });
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }
    console.error('Error updating profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al actualizar el perfil' 
    });
  }
}

/**
 * DELETE /api/profile
 * Hard delete user profile from DynamoDB
 */
async function handleDelete(req, res) {
  const { userId, confirmation } = req.body;

  if (!userId || !confirmation) {
    return res.status(400).json({ 
      success: false, 
      error: 'userId y confirmation son requeridos' 
    });
  }

  if (confirmation !== 'Delete') {
    return res.status(400).json({ 
      success: false, 
      error: 'Confirmación inválida. Debes escribir exactamente "Delete"' 
    });
  }

  try {
    await docClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userId },
      ConditionExpression: 'attribute_exists(PK)'
    }));

    return res.status(200).json({ 
      success: true, 
      message: 'Perfil eliminado exitosamente' 
    });
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }
    console.error('Error deleting profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar el perfil' 
    });
  }
}

