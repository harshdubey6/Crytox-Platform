import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // For demo purposes, we'll just simulate authentication
    // In a real app, you would make an API call here
    if (formData.email && formData.password) {
      login({
        email: formData.email,
      }, remember);
      navigate('/coins');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-[#181A20]">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#2A2D3A] rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-white font-bold mb-8 text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#1E2026] text-white border border-gray-600 focus:border-[#886AFF] focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#1E2026] text-white border border-gray-600 focus:border-[#886AFF] focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#1E2026] text-white border border-gray-600 focus:border-[#886AFF] focus:outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {/* Remember Me Checkbox */}
              {isLogin && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-gray-300 select-none cursor-pointer">
                    Remember Me
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-b from-white to-[#886AFF] text-black font-bold py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="text-[#886AFF] hover:text-[#9d84ff] transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 