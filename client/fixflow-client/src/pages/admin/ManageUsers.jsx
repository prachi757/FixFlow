import {
  Users,
  UserPlus,
  Search,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

function ManageUsers() {
  const [showForm, setShowForm] = useState(false);

  const users = [
    {
      id: 1,
      name: "Prachi Garg",
      email: "prachi@college.edu",
      role: "Student",
      specialization: "-",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@college.edu",
      role: "Staff",
      specialization: "Electrical",
    },
    {
      id: 3,
      name: "Amit Sharma",
      email: "amit@college.edu",
      role: "Staff",
      specialization: "Plumbing",
    },
    {
      id: 4,
      name: "Riya Singh",
      email: "riya@college.edu",
      role: "Student",
      specialization: "-",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Users
          </h1>

          <p className="text-slate-500 mt-1">
            Create and manage student and maintenance staff accounts.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
        >
          <UserPlus size={17} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Total Users</p>
              <p className="text-xl font-bold text-slate-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Students</p>
              <p className="text-xl font-bold text-slate-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wrench size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Maintenance Staff
              </p>
              <p className="text-xl font-bold text-slate-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <div className="h-11 flex items-center gap-2 px-3 bg-slate-50 border border-slate-200 rounded-xl">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Users */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">
            Users
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Students and maintenance staff
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {user.role === "Staff" ? (
                    <Wrench size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    user.role === "Staff"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {user.role}
                </span>

                {user.role === "Staff" && (
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {user.specialization}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ADD USER MODAL ================= */}

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add New User
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Create a student or maintenance staff account.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter college email"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-400"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>

                <select
                  defaultValue="Student"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-700 focus:border-blue-400"
                >
                  <option>Student</option>
                  <option>Staff</option>
                </select>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specialization
                </label>

                <select
                  defaultValue=""
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-700 focus:border-blue-400"
                >
                  <option value="">Not applicable</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Furniture</option>
                  <option>Cleaning</option>
                </select>

                <p className="text-xs text-slate-400 mt-2">
                  Select a specialization when creating a staff account.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-100">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Create User
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;