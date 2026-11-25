import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Users,
  UserPlus,
  Search,
  User,
  Wrench,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/users";

const initialForm = {
  name: "",
  collegeEmail: "",
  password: "",
  role: "student",
  specialization: "",
};

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setError("");

      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      const usersData = Array.isArray(response.data)
      ? response.data
      : response.data.users || [];
      
      setUsers(usersData);
    } catch (error) {
      console.error("Fetch users error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Could not load users. Check your backend.";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Count users
  const students = users.filter(
    (user) => user.role === "student"
  ).length;

  const staff = users.filter(
    (user) => user.role === "staff"
  ).length;

  // Search users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.collegeEmail.toLowerCase().includes(search.toLowerCase())
  );

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "role" && value === "student"
        ? { specialization: "" }
        : {}),
    });

    setError("");
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setFormData(initialForm);
    setError("");
  };

  // Create user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.role === "staff" && !formData.specialization) {
      const errorMessage = "Please select a staff specialization.";

      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      await axios.post(
        API_URL,
        {
          ...formData,
          name: formData.name.trim(),
          collegeEmail: formData.collegeEmail.trim().toLowerCase(),
          specialization:
            formData.role === "staff"
              ? formData.specialization
              : null,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("User created successfully!");

      closeForm();
      await fetchUsers();
    } catch (error) {
      console.error("Create user error:", error);

      const errorMessage =
        error.response?.data?.message || "Could not create user.";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Page Heading */}
      <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Manage Users
          </h1>

          <p className="mt-1 text-sm sm:text-base text-slate-500">
            Create and manage student and maintenance staff accounts.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setFormData(initialForm);
            setShowForm(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 sm:py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <UserPlus size={17} />
          Add User
        </button>

      </div>

      {/* Summary Cards */}
      <div className="mb-5 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">

        {[
          {
            label: "Total Users",
            value: users.length,
            icon: <Users size={20} />,
          },
          {
            label: "Students",
            value: students,
            icon: <User size={20} />,
          },
          {
            label: "Maintenance Staff",
            value: staff,
            icon: <Wrench size={20} />,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 shrink-0">
              {item.icon}
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-400">
                {item.label}
              </p>

              <p className="text-xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3">

        <Search size={18} className="text-slate-400 shrink-0" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full min-w-0 text-sm outline-none text-slate-700 placeholder:text-slate-400"
        />

      </div>

      {/* Users List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="border-b border-slate-100 px-4 sm:px-6 py-4">

          <h2 className="font-semibold text-slate-900">
            Users
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Students and maintenance staff
          </p>

        </div>

        {error && !showForm && (
          <p className="p-4 sm:p-5 text-sm text-red-600 break-words">
            {error}
          </p>
        )}

        {filteredUsers.length === 0 ? (
          <p className="p-6 sm:p-8 text-center text-sm text-slate-500">
            {error ? "Unable to display users." : "No users found."}
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col justify-between gap-3 sm:gap-4 border-b border-slate-100 p-4 sm:p-5 sm:flex-row sm:items-center"
            >

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 shrink-0">
                  {user.role === "staff" ? (
                    <Wrench size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 break-words">
                    {user.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400 break-all">
                    {user.collegeEmail}
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pl-0 sm:pl-0">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                  {user.role === "staff"
                    ? "Maintenance Staff"
                    : user.role === "admin"
                    ? "Admin"
                    : "Student"}
                </span>

                {user.role === "staff" && (
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                    {user.specialization}
                  </span>
                )}

              </div>

            </div>
          ))
        )}

      </div>

      {/* Add User Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white">

            <div className="flex items-center justify-between gap-3 border-b p-4 sm:p-5">

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">
                  Add New User
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Create a student or maintenance staff account.
                </p>
              </div>

              <button
                onClick={closeForm}
                type="button"
                className="rounded-lg p-2 hover:bg-slate-100 shrink-0"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="space-y-4 p-4 sm:p-6">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    College Email
                  </label>

                  <input
                    type="email"
                    name="collegeEmail"
                    value={formData.collegeEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter college email"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="student">Student</option>
                    <option value="staff">Maintenance Staff</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Specialization
                  </label>

                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    disabled={formData.role === "student"}
                    required={formData.role === "staff"}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">
                      {formData.role === "student"
                        ? "Not required for students"
                        : "Select specialization"}
                    </option>

                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                {error && (
                  <p className="text-sm text-red-600 break-words">
                    {error}
                  </p>
                )}

              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t p-4 sm:p-5">

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-slate-200 px-4 py-3 sm:py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-3 sm:py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create User
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageUsers;