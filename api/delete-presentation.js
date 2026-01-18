/**
 * Vercel Serverless Function: Delete Presentation
 * 
 * Triggers GitHub Action to delete presentation files from repository
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, presentationId, title } = req.body;

    if (!username || !presentationId) {
      return res.status(400).json({ error: 'Missing required fields: username, presentationId' });
    }

    const repoOwner = process.env.GITHUB_REPO_OWNER || 'wearecircleup';
    const repoName = process.env.GITHUB_REPO_NAME || 'wearecircleup';

    console.log(`[${username}] Deleting presentation: ${presentationId}`);

    const dispatchResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'delete_presentation',
          client_payload: {
            user: username,
            presentationId: presentationId,
            title: title || 'Untitled'
          }
        })
      }
    );

    if (!dispatchResponse.ok) {
      const errorText = await dispatchResponse.text();
      console.error(`[${username}] Failed to trigger delete workflow: ${dispatchResponse.status}`, errorText);
      return res.status(500).json({ 
        error: 'Failed to trigger delete workflow',
        details: `GitHub API returned ${dispatchResponse.status}`
      });
    }

    console.log(`[${username}] Delete workflow triggered successfully`);

    return res.status(200).json({
      success: true,
      message: 'Presentación eliminada correctamente'
    });

  } catch (error) {
    console.error('Error deleting presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
