import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const WelcomeScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/birth-data');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-purple safe-area-top safe-area-bottom">
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center min-h-screen max-w-md">
        <div className="text-center mb-8">
          <i className="fa fa-door-open text-6xl text-retro-cyan mb-4 animate-pixel-pulse"></i>
          <h1 className="text-3xl font-pixel text-white text-shadow-pixel mb-2">
            Welcome to
          </h1>
          <h2 className="text-4xl font-pixel text-retro-yellow text-shadow-pixel mb-4">
            RESONANCE NETWORK
          </h2>
          <p className="text-white/80 font-pixel text-sm">
            Discover your cosmic connections and join the resonance revolution
          </p>
        </div>

        <div className="pixel-card mb-6 animate-slide-up">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 font-pixel text-sm border-2 transition-all ${
                isLogin
                  ? 'bg-retro-cyan text-white border-retro-cyan'
                  : 'bg-transparent text-retro-cyan border-retro-cyan hover:bg-retro-cyan/20'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 font-pixel text-sm border-2 border-l-0 transition-all ${
                !isLogin
                  ? 'bg-retro-green text-white border-retro-green'
                  : 'bg-transparent text-retro-green border-retro-green hover:bg-retro-green/20'
              }`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-retro-cyan font-pixel text-sm mb-2">
                <i className="fa fa-envelope mr-2"></i>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pixel-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-retro-cyan font-pixel text-sm mb-2">
                <i className="fa fa-lock mr-2"></i>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pixel-input"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-retro-red/20 border-2 border-retro-red p-3 text-retro-red font-pixel text-sm">
                <i className="fa fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa fa-spinner animate-pixel-spin mr-2"></i>
                  {isLogin ? 'LOGGING IN...' : 'CREATING ACCOUNT...'}
                </>
              ) : (
                <>
                  <i className={`fa ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                  {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-white/60 font-pixel text-xs">
            By continuing, you agree to our cosmic terms of resonance
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;