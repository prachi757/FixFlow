import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  User,
  Sparkles,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

function AdminComplaintDetails() {
  const complaint = {
    id: "CF-1008",
    student: "Prachi Garg",
    title: "Ceiling fan not working",
    description:
      "The ceiling fan in my room is not working properly and stops after a few minutes.",
    location: "Hostel Block A, Room 204",

    // AI suggestion
    aiCategory: "Electrical",
    aiPriority: "Medium",

    // Admin's final classification
    category: "Electrical",
    priority: "Medium",

    // No staff assigned yet
    assignedTo: null,

    status: "Pending",
    submittedDate: "18 Sep 2026, 10:30 AM",
  };

  return (
    <div className="p-6">
      {/* Back */}
      <Link
        to="/admin/complaints"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={17} />
        Back to Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-semibold text-blue-600">
              {complaint.id}
            </p>

            <span className="text-slate-300">•</span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              <Clock3 size={13} />
              {complaint.status}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            {complaint.title}
          </h1>

          <p className="text-slate-500 mt-1">
            Review complaint details and take necessary action.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ================= MAIN CONTENT ================= */}
        <div className="xl:col-span-2 space-y-6">

          {/* Complaint Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ClipboardList size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Complaint Details
                </h2>

                <p className="text-xs text-slate-400">
                  Information submitted by the student
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Description
                </p>

                <p className="text-sm text-slate-700 leading-6">
                  {complaint.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Location
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <MapPin size={17} className="text-slate-400" />
                  {complaint.location}
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  AI Suggested Classification
                </h2>

                <p className="text-xs text-slate-400">
                  Review the AI suggestion before assigning the complaint.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Suggested Category
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.aiCategory}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Suggested Priority
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.aiPriority}
                </p>
              </div>
            </div>
          </div>

          {/* Final Classification */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="font-semibold text-slate-900">
                Verify Complaint
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Admin can modify the AI suggestion before assigning staff.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Category
                </label>

                <select
                  defaultValue={complaint.category}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400"
                >
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Furniture</option>
                  <option>Cleaning</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Priority
                </label>

                <select
                  defaultValue={complaint.priority}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="space-y-6">

          {/* Student Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Student Information
                </h2>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Submitted by
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {complaint.student}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs text-slate-400">
                Submitted on
              </p>

              <p className="text-sm text-slate-700 mt-1">
                {complaint.submittedDate}
              </p>
            </div>
          </div>

          {/* Assign Staff */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Assign Staff
                </h2>

                <p className="text-xs text-slate-400">
                  Select maintenance staff
                </p>
              </div>
            </div>

            <select className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400">
              <option value="">
                Select Staff
              </option>

              <option value="rahul-user-id">
                Rahul Kumar — Electrical
              </option>

              <option value="amit-user-id">
                Amit Sharma — Plumbing
              </option>

              <option value="vikas-user-id">
                Vikas Singh — Furniture
              </option>
            </select>

            <p className="text-xs text-slate-400 mt-2">
              Staff specialization is shown to help with assignment.
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">
              Complaint Actions
            </h2>

            <div className="space-y-3">
              <button className="w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                <CheckCircle2 size={17} />
                Verify & Assign
              </button>

              <button className="w-full h-11 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 flex items-center justify-center gap-2">
                <XCircle size={17} />
                Reject Complaint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;