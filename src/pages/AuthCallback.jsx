import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Section from "../components/Section";
import { GitHubAuthService } from "../shared/utils/github";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

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
        // In a real implementation, exchange code for token via backend
        // For now, simulate successful auth
        const mockUser = {
          id: 'user_' + Date.now(),
          username: 'github_user',
          avatarUrl: 'https://github.com/identicons/user.png'
        };

        GitHubAuthService.setUser(mockUser);
        setStatus('success');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Authentication failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

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
              <button
                onClick={() => navigate('/auth')}
                className="mt-4 px-6 py-2 bg-color-1 text-white rounded-lg hover:bg-color-1/80 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default AuthCallback;
