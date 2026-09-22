import {
  User,
  Mail,
  ShieldCheck,
  Wrench,
  Edit3,
} from "lucide-react";

function StaffProfile() {
  const staff = {
    name: "Rahul Kumar",
    email: "rahul@college.edu",
    role: "Maintenance Staff",
    specialization: "Electrical",
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Profile
        </h1>

        <p className="text-slate-500 mt-1">
          View and manage your maintenance staff account.
        </p>
      </div>

      {/* Profile + Account Information */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex flex-col items-center text-center">

            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold">
              R
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mt-4">
              {staff.name}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {staff.role}
            </p>

            <span className="mt-4 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
              {staff.specialization}
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
                Your maintenance staff account details
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
                {staff.name}
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
                {staff.email}
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
                {staff.role}
              </p>

            </div>

            {/* Specialization */}
            <div className="p-4 rounded-xl bg-slate-50">

              <div className="flex items-center gap-3 mb-2">
                <Wrench size={17} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Specialization
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {staff.specialization}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Staff Responsibilities */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Wrench size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Staff Responsibilities
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Access available to this account
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            View Assigned Complaints
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            Start Maintenance Work
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            Mark Complaints Resolved
          </span>

          <span className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium">
            View Notifications
          </span>

        </div>

      </div>

    </div>
  );
}

export default StaffProfile;