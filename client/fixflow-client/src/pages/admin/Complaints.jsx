import {
  Search,
  ClipboardList,
  ArrowRight,
  Clock3,
  Wrench,
  CheckCircle2,
} from "lucide-react";

function AdminComplaints() {
  const complaints = [
    {
      id: "CF-1008",
      student: "Prachi Garg",
      title: "Ceiling fan not working",
      location: "Hostel Block A, Room 204",
      category: "Electrical",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "CF-1007",
      student: "Rahul Sharma",
      title: "Water leakage near bathroom",
      location: "Hostel Block A",
      category: "Plumbing",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "CF-1006",
      student: "Anjali Verma",
      title: "Corridor light replacement",
      location: "Academic Block, Floor 2",
      category: "Electrical",
      priority: "Low",
      status: "Resolved",
    },
    {
      id: "CF-1005",
      student: "Riya Singh",
      title: "Broken study table",
      location: "Hostel Block B, Room 112",
      category: "Furniture",
      priority: "Medium",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Complaints
        </h1>

        <p className="text-slate-500 mt-1">
          Review and manage maintenance complaints submitted by students.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="flex-1 h-11 flex items-center gap-2 px-3 bg-slate-50 border border-slate-200 rounded-xl">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search by complaint ID, student or issue..."
              className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Status Filter */}
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
            <option>Rejected</option>
          </select>

          {/* Category Filter */}
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none">
            <option>All Categories</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Furniture</option>
            <option>Other</option>
          </select>
        </div>
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
                  <ClipboardList size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-400">
                      {complaint.id}
                    </p>

                    <span className="text-slate-300">•</span>

                    <p className="text-xs text-slate-400">
                      {complaint.student}
                    </p>
                  </div>

                  <h2 className="text-base font-semibold text-slate-800 mt-1">
                    {complaint.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {complaint.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">

                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      {complaint.category}
                    </span>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        complaint.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : complaint.priority === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {complaint.priority} Priority
                    </span>

                  </div>
                </div>
              </div>

              {/* Status + View */}
              <div className="flex items-center gap-4 xl:pl-6">

                {complaint.status === "Pending" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                    <Clock3 size={14} />
                    Pending
                  </span>
                )}

                {complaint.status === "In Progress" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    <Wrench size={14} />
                    In Progress
                  </span>
                )}

                {complaint.status === "Resolved" && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    <CheckCircle2 size={14} />
                    Resolved
                  </span>
                )}

                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminComplaints;