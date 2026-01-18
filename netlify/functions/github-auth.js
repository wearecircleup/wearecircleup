/**
 * Netlify Function: GitHub OAuth Token Exchange
 * 
 * This function securely exchanges the OAuth code for an access token
 * using the CLIENT_SECRET (which must never be exposed to the frontend)
 */

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { code, state } = JSON.parse(event.body);

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing authorization code' })
      };
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
      return {
        statusCode: 400,
        body: JSON.stringify({ error: tokenData.error_description || 'Token exchange failed' })
      };
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
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch user data' })
      };
    }

    const userData = await userResponse.json();

    // Return user data and token (token should be stored securely on client)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          id: userData.id.toString(),
          login: userData.login,
          username: userData.name || userData.login,
          email: userData.email,
          avatarUrl: userData.avatar_url
        },
        accessToken: accessToken // Client will use this for API calls
      })
    };

  } catch (error) {
    console.error('OAuth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
