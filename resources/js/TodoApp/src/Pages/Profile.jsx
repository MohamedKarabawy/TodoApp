import { useState } from "react";
import { getDecryptedCookie } from "../utils/cookieUtils";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../Redux/user/userUpdateSlice";

export default () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userUpdate);

  const userData = getDecryptedCookie('data')?.user;

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    password: "",
    password_confirmation: "",
  });

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password && formData.password_confirmation) {
      dataToSend.password = formData.password;
      dataToSend.password_confirmation = formData.password_confirmation;
    }

    await dispatch(userUpdate(dataToSend))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") 
        {
            setEditMode(false);
            setMessage(res.payload.message || "Profile updated successfully!");
            setTimeout(() => setMessage(null), 5000);
            setError(null);
        }
        else if(res.meta.requestStatus === "rejected")
        {
          setEditMode(true);
          setError(res.payload.message);
        }
          
      })
      .catch((err) => {
        setError(err.payload?.message || "An error occurred.");
        setEditMode(true);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 relative">
      {message && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition-all z-50">
          {message}
        </div>
      )}

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {error && (
          <div className="mb-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${editMode ? "border-blue-400 focus:ring-blue-300" : "bg-white border-none cursor-not-allowed"}`}
              value={formData.name}
              onChange={changeHandler}
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${editMode ? "border-blue-400 focus:ring-blue-300" : "bg-white border-none cursor-not-allowed"}`}
              value={formData.email}
              onChange={changeHandler}
              disabled={!editMode}
            />
          </div>

          {editMode && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={formData.password}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={formData.password_confirmation}
                  onChange={changeHandler}
                />
              </div>
            </>
          )}

          {editMode && (
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setEditMode(!editMode);
              if (!editMode) {
                setFormData({
                  name: userData?.name || "",
                  email: userData?.email || "",
                  password: "",
                  password_confirmation: "",
                });
              }
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
