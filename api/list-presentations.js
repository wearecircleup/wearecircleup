/**
 * Vercel Serverless Function: List User Presentations
 * 
 * Returns all presentations for a user from DynamoDB
 */

import { PresentationService } from '../backend/services/presentation.service.js';

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

    const presentations = await PresentationService.getUserPresentations(userId);

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
