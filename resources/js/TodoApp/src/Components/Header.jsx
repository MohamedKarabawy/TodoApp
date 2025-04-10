import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

export default function ({ userName = "User" }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/tasks" className="hover:text-blue-600">TodoApp</Link>
          </div>

          <ul className="flex px-10 py-2 text-gray-700 text-xl font-medium ">
            <li>
              <Link to="/tasks" className="hover:text-blue-600 cursor-pointer">Tasks</Link>
            </li>
          </ul>
        </div>

        <div className="cursor-pointer relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg"
          >
            <span className="text-gray-700 font-medium cursor-pointer">Welcome, {userName}</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <ul className="py-1">
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:text-gray-900">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="cursor-pointer block px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}