/**
 * Vercel Serverless Function: View Presentation
 * 
 * Returns HTML for a presentation to be displayed
 */

import { PresentationService } from '../backend/services/presentation.service.js';

export default async function handler(req, res) {
  const { presentationId } = req.query;

  if (!presentationId) {
    return res.status(400).send('<h1>Error: Presentation ID required</h1>');
  }

  try {
    const presentation = await PresentationService.getPresentation(presentationId);

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
