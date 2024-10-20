import React, { useState } from 'react';
import api from '../apiConfig/api'; // Import the API configuration

export default function LoginSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginAs, setLoginAs] = useState('user');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (isSignup && !username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!password.trim()) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let response;
      if (isSignup) {
        const registrationData = {
          email,
          password,
          username,
          loginAs,
        };
        console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));
        response = await api.post('/api/register', registrationData);
      } else {
        const loginData = { email, password };
        console.log('Sending login data:', JSON.stringify(loginData, null, 2));
        response = await api.post('/api/login', loginData);
      }

      console.log(isSignup ? 'Registration response:' : 'Login response:', response.data);

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
      } else {
        setSuccess(isSignup ? 'Registration successful! Please log in.' : 'Login successful!');
      }

      // TODO: Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Request error:', error);
      if (error.response && error.response.data) {
        if (error.response.data.message === 'Email already in use') {
          setError('This email is already registered. Please use a different email or try logging in.');
        } else {
          setError(error.response.data.message || `An error occurred during ${isSignup ? 'signup' : 'login'}`);
        }
      } else {
        setError(`An unexpected error occurred. Please try again later.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-36">
      <div className="max-w-4xl w-full space-y-8 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left section with hero image */}
          <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/Images/ScoutMarch.png')" }}>
          </div>

          {/* Right section with login/signup form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {isSignup ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isSignup ? 'Join our community today!' : 'Please sign in to your account'}
              </p>
            </div>
            {error && (
              <div className="mt-4 text-red-600 text-sm" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 text-green-600 text-sm" role="alert">
                {success}
              </div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {isSignup && (
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignup && (
                  <div>
                    <label htmlFor="loginAs" className="block text-sm font-medium text-gray-700 mb-1">
                      Login As
                    </label>
                    <select
                      id="loginAs"
                      name="loginAs"
                      value={loginAs}
                      onChange={(e) => setLoginAs(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}
              </div>

              {!isSignup && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
                </button>
              </div>
            </form>
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                    setSuccess('');
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}