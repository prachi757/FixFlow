import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function MyAssignedComplaints() {
  const complaints = [
    {
      id: "CF-1008",
      title: "Ceiling fan not working",
      student: "Prachi Garg",
      location: "Hostel Block A, Room 204",
      category: "Electrical",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "CF-1007",
      title: "Water leakage near bathroom",
      student: "Rahul Sharma",
      location: "Hostel Block A",
      category: "Plumbing",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "CF-1006",
      title: "Corridor light replacement",
      student: "Anjali Verma",
      location: "Academic Block, Floor 2",
      category: "Electrical",
      priority: "Low",
      status: "Resolved",
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          My Assigned Complaints
        </h1>

        <p className="text-slate-500 mt-1">
          View and manage maintenance complaints assigned to you.
        </p>
      </div>

      {/* Complaint List */}
      <div className="space-y-4">

        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all"
          >

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">

              {/* Complaint Information */}
              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ClipboardCheck size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {complaint.id}
                  </p>

                  <h2 className="text-base font-semibold text-slate-800 mt-1">
                    {complaint.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {complaint.location}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Reported by {complaint.student}
                  </p>
                </div>

              </div>

              {/* Complaint Details */}
              <div className="flex flex-wrap items-center gap-3">

                {/* Category */}
                <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                  {complaint.category}
                </span>

                {/* Priority */}
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    complaint.priority === "High"
                      ? "bg-red-50 text-red-600"
                      : complaint.priority === "Medium"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {complaint.priority} Priority
                </span>

                {/* Status */}
                {complaint.status === "Pending" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                    <Clock3 size={14} />
                    {complaint.status}
                  </span>
                )}

                {complaint.status === "In Progress" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    <Clock3 size={14} />
                    {complaint.status}
                  </span>
                )}

                {complaint.status === "Resolved" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    <CheckCircle2 size={14} />
                    {complaint.status}
                  </span>
                )}

                {/* View Button */}
                <Link
                  to={`/staff/complaints/${complaint.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
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

export default MyAssignedComplaints;