import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-32">
      {/* Header with logos - improved mobile responsiveness */}
      <header className="bg-white py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <img 
            src="/Images/ScoutLogo.png" 
            alt="Scout Logo" 
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center order-first sm:order-none">
            Tamil Nadu Scout 
          </h1>
          <img 
            src="/Images/tn-logo.png" 
            alt="TN Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto mt-8 sm:mt-16 px-4 sm:px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left section with hero image */}
            <div className="hidden md:block w-1/2 p-8">
              <img 
                src="/Images/ScoutMarch.png"
                alt="Hero" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Right section with login form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}