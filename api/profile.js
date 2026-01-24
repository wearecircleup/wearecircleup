/**
 * Vercel Serverless Function - User Profile CRUD Operations
 * 
 * This function handles all profile operations using Vercel Blob storage with NDJSON format.
 * Each user has their own NDJSON file with versioned records for complete audit trail.
 * 
 * Endpoints:
 * - GET    /api/profile?userId={userId}  - Get user profile
 * - POST   /api/profile                  - Create new profile
 * - PUT    /api/profile                  - Update existing profile
 * - DELETE /api/profile                  - Delete profile (soft delete)
 * 
 * Environment Variables Required:
 * - BLOB_READ_WRITE_TOKEN: Vercel Blob access token
 */

import { put, head } from '@vercel/blob';

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
 * Retrieve user profile
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
    const pathname = `profiles/${userId}.ndjson`;
    const content = await readNDJSON(pathname);

    if (!content) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }

    const profile = parseProfileContent(content);

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado o eliminado' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      profile 
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
 * Create new user profile
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

    // Check if profile already exists
    const pathname = `profiles/${profileData.userId}.ndjson`;
    const existingContent = await readNDJSON(pathname);
    
    if (existingContent) {
      const existingProfile = parseProfileContent(existingContent);
      if (existingProfile) {
        return res.status(409).json({ 
          success: false, 
          error: 'El perfil ya existe. Usa PUT para actualizar.' 
        });
      }
    }

    // Create profile record with metadata
    const now = new Date().toISOString();
    const profileRecord = {
      ...profileData,
      version: 1,
      createdAt: now,
      updatedAt: now,
      profileComplete: true,
      legalDisclaimerAcceptedAt: now
    };

    // Write to Vercel Blob
    const newLine = JSON.stringify(profileRecord) + '\n';
    await put(pathname, newLine, {
      access: 'public',
      contentType: 'application/x-ndjson',
      addRandomSuffix: false
    });

    return res.status(201).json({ 
      success: true, 
      profile: profileRecord,
      message: 'Perfil creado exitosamente' 
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al crear el perfil' 
    });
  }
}

/**
 * PUT /api/profile
 * Update existing user profile
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
    const pathname = `profiles/${updates.userId}.ndjson`;
    const existingContent = await readNDJSON(pathname);

    if (!existingContent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }

    const currentProfile = parseProfileContent(existingContent);

    if (!currentProfile) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado o eliminado' 
      });
    }

    // Create updated record
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      userId: currentProfile.userId, // Prevent userId change
      version: currentProfile.version + 1,
      updatedAt: new Date().toISOString(),
      createdAt: currentProfile.createdAt // Preserve creation date
    };

    // Append to NDJSON file
    const newLine = JSON.stringify(updatedProfile) + '\n';
    await put(pathname, existingContent + newLine, {
      access: 'public',
      contentType: 'application/x-ndjson',
      addRandomSuffix: false
    });

    return res.status(200).json({ 
      success: true, 
      profile: updatedProfile,
      message: 'Perfil actualizado exitosamente' 
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al actualizar el perfil' 
    });
  }
}

/**
 * DELETE /api/profile
 * Soft delete user profile
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
    const pathname = `profiles/${userId}.ndjson`;
    const existingContent = await readNDJSON(pathname);

    if (!existingContent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Perfil no encontrado' 
      });
    }

    // Create soft delete record
    const deletionRecord = {
      deleted: true,
      deletedAt: new Date().toISOString(),
      deletedBy: userId
    };

    // Append deletion record
    const newLine = JSON.stringify(deletionRecord) + '\n';
    await put(pathname, existingContent + newLine, {
      access: 'public',
      contentType: 'application/x-ndjson',
      addRandomSuffix: false
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Perfil eliminado exitosamente' 
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar el perfil' 
    });
  }
}

/**
 * Read NDJSON file from Vercel Blob
 * Returns empty string if file doesn't exist
 */
async function readNDJSON(pathname) {
  try {
    // Check if file exists
    await head(`https://${process.env.BLOB_READ_WRITE_TOKEN?.split('_')[0]}.public.blob.vercel-storage.com/${pathname}`);
    
    const response = await fetch(
      `https://${process.env.BLOB_READ_WRITE_TOKEN?.split('_')[0]}.public.blob.vercel-storage.com/${pathname}`
    );
    
    if (!response.ok) {
      return '';
    }
    
    return await response.text();
  } catch {
    return '';
  }
}

/**
 * Parse NDJSON content and return latest non-deleted profile
 */
function parseProfileContent(content) {
  if (!content || content.trim() === '') {
    return null;
  }

  const records = content
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(record => record !== null);

  if (records.length === 0) {
    return null;
  }

  // Check if last record is a deletion
  const lastRecord = records[records.length - 1];
  if (lastRecord.deleted === true) {
    return null;
  }

  // Get latest profile record (filter out deletion records)
  const profileRecords = records.filter(r => r.userId && !r.deleted);
  
  return profileRecords.length > 0 
    ? profileRecords[profileRecords.length - 1] 
    : null;
}
