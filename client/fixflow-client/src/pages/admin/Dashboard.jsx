import {
  ClipboardList,
  Clock3,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function AdminDashboard() {
  const complaints = [
    {
      id: "CF-1008",
      title: "Ceiling fan not working",
      location: "Hostel Block A, Room 204",
      category: "Electrical",
      status: "Pending",
    },
    {
      id: "CF-1007",
      title: "Water leakage near bathroom",
      location: "Hostel Block A",
      category: "Plumbing",
      status: "In Progress",
    },
    {
      id: "CF-1006",
      title: "Corridor light replacement",
      location: "Academic Block, Floor 2",
      category: "Electrical",
      status: "Resolved",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Monitor and manage maintenance complaints.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ClipboardList size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Total Complaints
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            24
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock3 size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Pending
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            6
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Wrench size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            In Progress
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            9
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Resolved / Closed
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            9
          </h2>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Complaints
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Latest maintenance requests submitted by students.
            </p>
          </div>

          <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50"
            >
              <div>
                <p className="text-xs text-slate-400">
                  {complaint.id}
                </p>

                <h3 className="text-sm font-semibold text-slate-800 mt-1">
                  {complaint.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {complaint.location} • {complaint.category}
                </p>
              </div>

              <div>
                {complaint.status === "Pending" && (
                  <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                    Pending
                  </span>
                )}

                {complaint.status === "In Progress" && (
                  <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    In Progress
                  </span>
                )}

                {complaint.status === "Resolved" && (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Overview */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900">
          Complaint Categories
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Overview of reported maintenance issues.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Electrical</span>
              <span className="font-medium text-slate-800">10</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[70%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Plumbing</span>
              <span className="font-medium text-slate-800">7</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[50%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Furniture</span>
              <span className="font-medium text-slate-800">4</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[30%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Other</span>
              <span className="font-medium text-slate-800">3</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[20%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;