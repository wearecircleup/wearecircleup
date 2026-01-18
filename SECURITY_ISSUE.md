# 🚨 CRITICAL SECURITY ISSUE - OAuth Implementation

## Problem Identified

**Date:** 2026-01-18

### Issue Description

The current OAuth implementation has a **critical security flaw** where all authenticated users see the same data (CircleUP organization's data) instead of their own.

### Root Cause

In `src/pages/AuthCallback.jsx` (lines 46-59), the code uses `VITE_GITHUB_PUBLIC_TOKEN` (CircleUP's organization token) to fetch user data instead of exchanging the OAuth code for the user's personal access token:

```javascript
// ❌ WRONG: Uses CircleUP's token
const token = import.meta.env.VITE_GITHUB_PUBLIC_TOKEN;

const userResponse = await fetch('https://api.github.com/user', {
  headers: {
    'Authorization': `Bearer ${token}`,  // ← Always returns CircleUP's data
  }
});
```

### Impact

1. **Data Leak**: All users see CircleUP's presentations
2. **No User Isolation**: No separation between user accounts
3. **Wrong User Identity**: `user.username` always shows "CircleUP"
4. **Privacy Violation**: Users can access data they shouldn't see

### Why This Happened

GitHub OAuth requires a **backend** to securely exchange the authorization code for an access token using the `CLIENT_SECRET`. The frontend attempted to work around this by using a public token, which is fundamentally insecure.

## Solution Implemented

### 1. Netlify Serverless Function

Created `netlify/functions/github-auth.js` to handle OAuth token exchange securely on the backend.

**Flow:**
```
User → GitHub OAuth → Callback with code → 
Netlify Function (with CLIENT_SECRET) → 
Exchange code for user's token → 
Fetch user's data with their token → 
Return to frontend
```

### 2. Updated AuthCallback.jsx

Now calls the Netlify function instead of using CircleUP's token:

```javascript
// ✅ CORRECT: Exchange code via backend
const authResponse = await fetch('/.netlify/functions/github-auth', {
  method: 'POST',
  body: JSON.stringify({ code, state })
});

const { user, accessToken } = await authResponse.json();
// accessToken is the USER's token, not CircleUP's
```

### 3. Store User's Token

Each user's access token is now stored in localStorage and used for their API calls:

```javascript
GitHubAuthService.setUser({
  ...user,
  accessToken // User's personal token
});
```

## Deployment Requirements

### Environment Variables (Netlify)

Add to Netlify dashboard:

```bash
GITHUB_APP_CLIENT_ID=your_client_id
GITHUB_APP_CLIENT_SECRET=your_client_secret  # ⚠️ NEVER expose to frontend
GITHUB_APP_REDIRECT_URI=https://circleup.com.co/auth/callback
```

### GitHub OAuth App Configuration

Update redirect URIs in GitHub OAuth App settings:
- Development: `http://localhost:5173/auth/callback`
- Production: `https://circleup.com.co/auth/callback`

## Testing Checklist

- [ ] Test with multiple different GitHub accounts
- [ ] Verify each user sees only their own presentations
- [ ] Confirm `user.username` shows correct username
- [ ] Check localStorage contains user's token, not CircleUP's
- [ ] Verify presentations are isolated by `user.login`
- [ ] Test logout and re-login with different account

## Files Modified

```
netlify/functions/github-auth.js (NEW)
netlify.toml (NEW)
src/pages/AuthCallback.jsx (MODIFIED)
src/shared/utils/github.ts (MODIFIED)
.env.example (MODIFIED)
```

## Security Best Practices Applied

1. ✅ CLIENT_SECRET never exposed to frontend
2. ✅ Token exchange happens on backend
3. ✅ Each user has their own access token
4. ✅ Data isolation by user.login
5. ✅ State parameter for CSRF protection
6. ✅ Tokens stored securely in localStorage (consider httpOnly cookies for production)

## Next Steps

1. Deploy to Netlify with environment variables configured
2. Test with multiple GitHub accounts
3. Consider implementing token refresh mechanism
4. Add token expiration handling
5. Implement proper session management
6. Consider moving to httpOnly cookies for token storage

## References

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
