import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUser } from "../api/apiService";
import { UserUpdate} from "../types";

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || "0");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdate>();

  // Get user details
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: userId > 0,
  });

  // Update form data when user data is loaded
  React.useEffect(() => {
    if (userData && userData.data) {
      reset({
        first_name: userData.data.first_name,
        last_name: userData.data.last_name,
        email: userData.data.email,
      });
    }
  }, [userData, reset]);

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: (data: UserUpdate) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      alert("User updated successfully!");
      navigate("/users");
    },
    onError: () => {
      alert("Failed to update user. Please try again.");
    },
  });

  const onSubmit = (data: UserUpdate) => {
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate("/users");
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="ml-2">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>

        {userData?.data && (
          <div className="mb-6 flex flex-col items-center">
            <img
              src={userData.data.avatar}
              alt={`${userData.data.first_name} ${userData.data.last_name}`}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p className="text-gray-500">User ID: {userId}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("last_name", {
                required: "Last name is required",
              })}
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || updateMutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
