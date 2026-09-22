import { User, Mail, ShieldCheck } from "lucide-react";

function Profile() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Profile
        </h1>
        <p className="text-slate-500 mt-1">
          View your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
            P
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Prachi Garg
            </h2>
            <p className="text-sm text-slate-500">
              Student
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="mt-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
              <User size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                Prachi Garg
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
              <Mail size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">College Email</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                prachi@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Account Role</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                Student
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;