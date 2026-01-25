/**
 * Vercel Serverless Function: Get Presentation
 * 
 * Returns a single presentation by ID from DynamoDB
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
    const { presentationId } = req.query;

    if (!presentationId) {
      return res.status(400).json({ error: 'presentationId is required' });
    }

    console.log(`Fetching presentation: ${presentationId}`);

    const presentation = await PresentationService.getPresentation(presentationId);

    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }

    return res.status(200).json({
      success: true,
      presentation: presentation
    });

  } catch (error) {
    console.error('Error fetching presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
