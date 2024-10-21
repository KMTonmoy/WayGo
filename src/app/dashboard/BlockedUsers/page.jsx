"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await fetch("https://way-go-backend.vercel.app/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        const blocked = data.filter((user) => user.role === "blocked");
        setBlockedUsers(blocked);
        setFilteredUsers(blocked);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  useEffect(() => {
    const filtered = blockedUsers.filter((user) => {
      const nameMatch =
        user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch =
        user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || emailMatch;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, blockedUsers]);

  const handleUnblockUser = async (email) => {
    try {
      const response = await fetch(
        `https://way-go-backend.vercel.app/users/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "user" }),
        }
      );

      if (!response.ok) throw new Error("Failed to unblock user");

      setBlockedUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== email)
      );

      Swal.fire({
        title: "Success!",
        text: `User with email ${email} has been unblocked.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Blocked Users</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or email"
        className="mb-6 p-3 border rounded w-full outline-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500">
            No blocked users found.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.email}
              className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  alt="Profile"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                onClick={() => handleUnblockUser(user.email)}
              >
                Unblock
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
