import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, remember }))
      .unwrap()
      .then(() => {
        navigate('/tasks');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-2">Please log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={(e) => setRemember(e.target.value)}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error.message || 'Invalid login credentials'}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};