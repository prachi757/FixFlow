import {
  User,
  Mail,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  PlayCircle,
  CheckCircle2,
  Bell,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function StaffProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-4 sm:p-6 text-slate-500">
        Loading profile...
      </div>
    );
  }

  const name = user.name || "Staff Member";
  const email = user.collegeEmail || "Not available";
  const role = user.role || "staff";
  const specialization = user.specialization || "Not assigned";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1);

  const responsibilities = [
    {
      label: "View Assigned Complaints",
      icon: ClipboardCheck,
    },
    {
      label: "Start Maintenance Work",
      icon: PlayCircle,
    },
    {
      label: "Mark Complaints Resolved",
      icon: CheckCircle2,
    },
    {
      label: "View Notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto min-w-0">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          View your maintenance staff account and work information.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Banner */}
        <div className="h-28 sm:h-40 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 relative overflow-hidden">

          <div className="absolute -right-12 -top-24 w-80 h-80 rounded-full border-[40px] border-white/10" />

          <div className="absolute right-48 -bottom-32 w-64 h-64 rounded-full border-[25px] border-white/10" />

          <div className="absolute right-10 top-8 w-32 h-32 rounded-full bg-white/5" />

        </div>

        {/* Profile Identity */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-7">

          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 -mt-12 sm:-mt-14 relative">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-lg shrink-0">

              <div className="w-full h-full rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl sm:text-4xl font-bold">
                {initials}
              </div>

            </div>

            {/* Name and Email */}
            <div className="flex-1 min-w-0 pt-1 sm:pt-16">

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
                {name}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-1 break-all">
                {email}
              </p>

            </div>

            {/* Role Badge */}
            <div className="sm:pt-16">

              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold">
                <ShieldCheck size={18} />
                {formattedRole}
              </span>

            </div>

          </div>

          {/* Account Information */}
          <div className="border-t border-slate-100 mt-6 sm:mt-7 pt-5 sm:pt-6">

            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <BadgeCheck size={19} />

              <span className="text-sm">
                Account Information
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Your maintenance staff account details are displayed below.
            </p>

          </div>

        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-6 sm:mt-8">

        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Personal Information
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your registered maintenance staff details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

          {/* Full Name */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-blue-200 transition-all">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <User size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Full Name
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
                  {name}
                </p>
              </div>

            </div>
          </div>

          {/* College Email */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-indigo-200 transition-all">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Mail size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  College Email
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1 break-all">
                  {email}
                </p>
              </div>

            </div>
          </div>

          {/* Account Role */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-emerald-200 transition-all">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Account Role
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {formattedRole}
                </p>
              </div>

            </div>
          </div>

          {/* Specialization */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-amber-200 transition-all">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Wrench size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Specialization
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
                  {specialization}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Staff Responsibilities */}
      <div className="mt-6 sm:mt-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Wrench size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Staff Responsibilities
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Features available to your maintenance staff account.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

          {responsibilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center shrink-0">
                  <Icon size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-700 min-w-0 break-words">
                  {item.label}
                </p>

                <BadgeCheck
                  size={17}
                  className="ml-auto text-emerald-500 shrink-0"
                />
              </div>
            );
          })}

        </div>

      </div>

      {/* FixFlow Account Note */}
      <div className="mt-5 sm:mt-6 bg-blue-50/70 border border-blue-100 rounded-2xl p-4 sm:p-5">

        <div className="flex items-start gap-3 sm:gap-4">

          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-blue-600 flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-800">
              FixFlow Staff Account
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-6">
              Your specialization determines the type of maintenance
              complaints assigned to you. You can manage your assigned
              complaints and update their progress through FixFlow.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StaffProfile;