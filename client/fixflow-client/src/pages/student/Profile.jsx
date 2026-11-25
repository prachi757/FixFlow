import {
  User,
  Mail,
  ShieldCheck,
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
  Building2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-4 sm:p-6 text-sm sm:text-base text-slate-500">
        Loading profile...
      </div>
    );
  }

  const name = user.name || "User";
  const email = user.collegeEmail || "Not available";
  const role = user.role || "user";
  const specialization = user.specialization;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1);

  const RoleIcon =
    role === "student"
      ? GraduationCap
      : role === "staff"
      ? BriefcaseBusiness
      : ShieldCheck;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto min-w-0">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          View your personal and account information.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Banner */}
        <div className="h-28 sm:h-36 md:h-40 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 relative overflow-hidden">

          <div className="absolute -right-10 -top-24 w-72 h-72 rounded-full border-[35px] border-white/10" />

          <div className="absolute right-48 -bottom-32 w-64 h-64 rounded-full border-[25px] border-white/10" />

          <div className="absolute right-10 top-5 w-36 h-36 rounded-full bg-white/5" />

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
                <RoleIcon size={18} />
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
              Your FixFlow account details are displayed below.
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
            Your registered account details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

          {/* Full Name */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-blue-200 transition-all">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
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

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
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

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Account Role
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {formattedRole}
                </p>
              </div>

            </div>
          </div>

          {/* Staff Specialization */}
          {role === "staff" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-amber-200 transition-all">

              <div className="flex items-center gap-3 sm:gap-4">

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Specialization
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
                    {specialization || "Not assigned"}
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* FixFlow Account Card */}
      <div className="mt-6 sm:mt-8 bg-blue-50/70 border border-blue-100 rounded-2xl p-4 sm:p-6">

        <div className="flex items-start gap-3 sm:gap-4">

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white text-blue-600 flex items-center justify-center shrink-0">
            <Building2 size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-800">
              FixFlow Account
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-6">
              This account is registered with your college
              maintenance management system. Your account role
              determines the features and access available to you.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;