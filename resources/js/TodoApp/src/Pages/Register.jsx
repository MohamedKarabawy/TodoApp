import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userCreate } from '../Redux/user/userCreateSlice';

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.userCreate); // Access error and loading states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, password_confirmation } = formData;

    setFormErrors({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    await dispatch(userCreate({ name, email, password, password_confirmation }))
          .unwrap()
          .then(() => {
            navigate('/tasks');
          })
          .catch((error) => {
            console.error('Login failed:', error);
          });

    if (error) {
      const errors = error?.validationErrors || {};  
      setFormErrors(errors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Register</h1>
          <p className="text-gray-500 mt-2">Please fill in the details to register</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          {error && (
            <div className="text-red-500 text-center mb-4">
              <p>{error.message || 'Something went wrong, please try again.'}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={changeHandler}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full name"
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={changeHandler}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={changeHandler}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={changeHandler}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
            />
            {formErrors.password_confirmation && <p className="text-red-500 text-xs mt-1">{formErrors.password_confirmation}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:text-blue-700">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};