import {
  User,
  Mail,
  ShieldCheck,
  Building2,
  Edit3,
} from "lucide-react";

function AdminProfile() {
  const admin = {
    name: "Admin",
    email: "admin@college.edu",
    role: "Administrator",
    department: "Maintenance Management",
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Profile
        </h1>

        <p className="text-slate-500 mt-1">
          View and manage your administrator account.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold">
              A
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mt-4">
              {admin.name}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {admin.role}
            </p>

            <span className="mt-4 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
              Administrator
            </span>
          </div>
        </div>

        {/* Account Information */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Account Information
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Your administrator account details
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <User size={17} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Full Name
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {admin.name}
              </p>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={17} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Email Address
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {admin.email}
              </p>
            </div>

            {/* Role */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={17} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Account Role
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {admin.role}
              </p>
            </div>

            {/* Department */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <Building2 size={17} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Department
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {admin.department}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Access */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Administrator Access
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Access available to this account
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            Manage Complaints
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            Assign Staff
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            Manage Users
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            View Notifications
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;