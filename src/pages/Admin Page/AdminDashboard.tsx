import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Admin {
  username: string;
  email: string;
}

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");
  const [admin, setAdmin] = useState<Admin | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = () => {
    axios
      .get("https://zego-backend.vercel.app/api/verifyToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdmin(res.data.user);
        console.log("Admin Info:", res.data);
      })
      .catch((error) => {
        console.error("Error verifying token:", error.response?.data?.message || error.message);
        localStorage.removeItem("adminToken"); // Remove invalid token
      });
  };

  const handleClick = () => {
    navigate("/live-streaming");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Dashboard</h2>

        {admin ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Welcome, {admin.username}</h3>
            <p className="text-gray-500">{admin.email}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading admin info...</p>
        )}
      </div>

      {/* Centered Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          GO LIVE NOW
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
