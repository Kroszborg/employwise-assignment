import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api/apiService";
import { useAuth } from "../context/AuthContext";

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getUsers(currentPage),
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleEdit = (userId: number) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteMutation.mutateAsync(userId);
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  // Filter users based on search term
  const filteredUsers =
    data?.data?.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">User Management</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2">Loading users...</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>Error loading users. Please try again.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <div className="p-4 bg-indigo-50">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-center">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-gray-600 text-center mb-4">{user.email}</p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search.
            </div>
          )}

          <div className="mt-8 flex justify-center space-x-4">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50 transition"
            >
              Previous
            </button>
            <span className="py-2 px-4 bg-indigo-100 rounded-md">
              Page {currentPage} of {data?.total_pages || 1}
            </span>
            <button
              disabled={currentPage >= (data?.total_pages || 1)}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, data?.total_pages || 1)
                )
              }
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;
