/**
 * Vercel Serverless Function: GitHub OAuth Token Exchange
 * 
 * This function securely exchanges the OAuth code for an access token
 * using the CLIENT_SECRET (which must never be exposed to the frontend)
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, state } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_APP_CLIENT_ID,
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.GITHUB_APP_REDIRECT_URI
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ 
        error: tokenData.error_description || 'Token exchange failed' 
      });
    }

    const accessToken = tokenData.access_token;

    // Fetch user data using the user's access token
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!userResponse.ok) {
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }

    const userData = await userResponse.json();

    // Return user data and token (token should be stored securely on client)
    return res.status(200).json({
      user: {
        id: userData.id.toString(),
        login: userData.login,
        username: userData.name || userData.login,
        email: userData.email,
        avatarUrl: userData.avatar_url
      },
      accessToken: accessToken // Client will use this for API calls
    });

  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
