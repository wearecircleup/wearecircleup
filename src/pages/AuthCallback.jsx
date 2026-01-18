import { useEffect, useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { GitHubAuthService } from "../shared/utils/github";

const AuthCallback = ({ setCurrentPage }) => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      // Try to get params from hash first (GitHub Pages), then from search (local dev)
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
      const searchParams = new URLSearchParams(window.location.search);
      
      const code = hashParams.get('code') || searchParams.get('code');
      const state = hashParams.get('state') || searchParams.get('state');
      const errorParam = hashParams.get('error') || searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setError('GitHub authentication was cancelled or failed');
        return;
      }

      if (!code || !state) {
        setStatus('error');
        setError('Invalid callback parameters');
        return;
      }

      if (!GitHubAuthService.validateState(state)) {
        setStatus('error');
        setError('Invalid state parameter. Possible CSRF attack.');
        return;
      }

      try {
        // Exchange code for access token via backend function
        // This is secure because CLIENT_SECRET stays on the server
        const authResponse = await fetch('/.netlify/functions/github-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code, state })
        });

        if (!authResponse.ok) {
          const errorData = await authResponse.json();
          throw new Error(errorData.error || 'Authentication failed');
        }

        const { user, accessToken } = await authResponse.json();
        
        // Store user data and their personal access token
        GitHubAuthService.setUser({
          ...user,
          accessToken // Store user's token for API calls
        });
        setStatus('success');
        
        setTimeout(() => {
          // Clear URL and redirect to dashboard
          window.history.replaceState({}, '', '/');
          setCurrentPage('dashboard');
        }, 1500);
      } catch (err) {
        console.error('Auth error:', err);
        setStatus('error');
        setError(err.message || 'Authentication failed');
      }
    };

    handleCallback();
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>

      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {status === 'processing' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <svg className="animate-spin h-16 w-16 text-color-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-n-1">Authenticating...</h2>
              <p className="text-n-4">Please wait while we connect your GitHub account</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-n-1">Success!</h2>
              <p className="text-n-4">Redirecting to dashboard...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-n-1">Authentication Failed</h2>
              <p className="text-n-4">{error}</p>
              <Button
                onClick={() => setCurrentPage('login')}
                className="mt-4"
                white
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default AuthCallback;
