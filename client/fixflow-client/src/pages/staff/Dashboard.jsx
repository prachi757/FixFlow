import {
  ClipboardCheck,
  Clock3,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function StaffDashboard() {
  const complaints = [
    {
      id: "CF-1008",
      title: "Ceiling fan not working",
      location: "Hostel Block A, Room 204",
      student: "Prachi Garg",
      status: "Pending",
      statusType: "pending",
    },
    {
      id: "CF-1007",
      title: "Water leakage near bathroom",
      location: "Hostel Block A",
      student: "Rahul Sharma",
      status: "In Progress",
      statusType: "progress",
    },
    {
      id: "CF-1006",
      title: "Corridor light replacement",
      location: "Academic Block, Floor 2",
      student: "Anjali Verma",
      status: "Resolved",
      statusType: "resolved",
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, Rahul 👋
          </h1>

          <p className="text-slate-500 mt-1">
            Here's an overview of your assigned maintenance complaints.
          </p>
        </div>

        <Link
          to="/staff/complaints"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
        >
          <ClipboardCheck size={17} />
          View Assigned Complaints
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Assigned
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                12
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ClipboardCheck size={21} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                3
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                4
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wrench size={21} />
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                5
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>

      </div>

      {/* Recent Assigned Complaints */}
      <div className="bg-white border border-slate-200 rounded-2xl mt-6 overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Assigned Complaints
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Complaints assigned to you
            </p>
          </div>

          <Link
            to="/staff/complaints"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">

          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition"
            >

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ClipboardCheck size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {complaint.id}
                  </p>

                  <h3 className="text-sm font-semibold text-slate-800 mt-1">
                    {complaint.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {complaint.location}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Reported by {complaint.student}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                {complaint.statusType === "pending" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                    <Clock3 size={14} />
                    {complaint.status}
                  </span>
                )}

                {complaint.statusType === "progress" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    <Clock3 size={14} />
                    {complaint.status}
                  </span>
                )}

                {complaint.statusType === "resolved" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    <CheckCircle2 size={14} />
                    {complaint.status}
                  </span>
                )}

                <Link
                  to={`/staff/complaints/${complaint.id}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default StaffDashboard;