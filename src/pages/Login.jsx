import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path apne project ke hisaab se adjust karein
import API from '../api/axios'; // Aapka axios file path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth(); // AuthContext se login function liya
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Backend pe login request bhej rahe hain (endpoint adjust karein agar zaroorat ho)
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      // API response se token nikaal rahe hain
      const token = response.data?.token || response.data?.data?.token;

      if (!token) {
        throw new Error("Token nahi mila. Kripya backend API response check karein.");
      }

      // 1. Context aur In-Memory Variable me token save karein
      login(token);

      // 2. Successful login ke baad Dashboard/Home pe redirect karein
      navigate('/dashboard');
      
    } catch (err) {
      console.error("Login Error:", err);
      // Backend se aane wala error message dikhayein ya fallback text use karein
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-8 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Please enter your details to sign in
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2a73ff] focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-[#2a73ff] hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2a73ff] focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-[#0f172a] hover:bg-[#2a73ff] hover:shadow-lg active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-xs text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#2a73ff] font-bold hover:underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;