import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function MyComplaints() {
  const complaints = [
    {
      id: "CF-1008",
      title: "Ceiling fan not working",
      location: "Room 204",
      date: "18 Sep 2026",
      status: "In Progress",
      statusType: "progress",
    },
    {
      id: "CF-1007",
      title: "Water leakage near bathroom",
      location: "Block A",
      date: "17 Sep 2026",
      status: "Pending",
      statusType: "pending",
    },
    {
      id: "CF-1006",
      title: "Light not working",
      location: "Room 112",
      date: "15 Sep 2026",
      status: "Resolved",
      statusType: "resolved",
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          My Complaints
        </h1>

        <p className="text-slate-500 mt-1">
          View and track all your maintenance complaints.
        </p>
      </div>

      {/* Complaints */}
      <div className="space-y-4">

        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              {/* Complaint Information */}
              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ClipboardList size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {complaint.id}
                  </p>

                  <h2 className="text-base font-semibold text-slate-800 mt-1">
                    {complaint.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {complaint.location} • {complaint.date}
                  </p>
                </div>

              </div>

              {/* Status + View */}
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
                to={`/student/my-complaints/${complaint.id}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    View
                    <ArrowRight size={16} />
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default MyComplaints;