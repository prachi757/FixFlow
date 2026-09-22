import {
  ArrowLeft,
  MapPin,
  User,
  Wrench,
  Clock3,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

function StaffComplaintDetails() {
  const complaint = {
    id: "CF-1008",
    title: "Ceiling fan not working",
    description:
      "The ceiling fan in my room is not working properly and stops after a few minutes.",
    location: "Hostel Block A, Room 204",
    student: "Prachi Garg",
    email: "prachi@college.edu",
    category: "Electrical",
    priority: "Medium",
    status: "Pending",
    submittedDate: "18 Sep 2026, 10:30 AM",
  };

  const timeline = [
    {
      title: "Complaint Assigned",
      description: "This complaint was assigned to you by the administrator.",
      date: "18 Sep 2026, 12:15 PM",
      completed: true,
    },
    {
      title: "Work Started",
      description: "Start work when you begin working on this complaint.",
      date: "",
      completed: false,
    },
    {
      title: "Resolved",
      description: "Mark the complaint as resolved after completing the maintenance work.",
      date: "",
      completed: false,
    },
  ];

  return (
    <div className="p-6">

      {/* Back */}
      <Link
        to="/staff/complaints"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={17} />
        Back to Assigned Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-600">
              {complaint.id}
            </span>

            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              {complaint.status}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            {complaint.title}
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Submitted on {complaint.submittedDate}
          </p>
        </div>

        {/* Action */}
        {complaint.status === "Pending" && (
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
            <PlayCircle size={18} />
            Start Work
          </button>
        )}

        {complaint.status === "In Progress" && (
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">
            <CheckCircle2 size={18} />
            Mark Resolved
          </button>
        )}

        {complaint.status === "Resolved" && (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold">
            <CheckCircle2 size={18} />
            Resolved
          </span>
        )}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">

          {/* Complaint Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wrench size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Complaint Details
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Issue reported by the student
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">
                Description
              </p>

              <p className="text-sm leading-6 text-slate-600">
                {complaint.description}
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-50">
              <MapPin
                size={18}
                className="text-slate-400 mt-0.5 shrink-0"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {complaint.location}
                </p>
              </div>
            </div>

          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="mb-6">
              <h2 className="font-semibold text-slate-900">
                Complaint Timeline
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Track the progress of this complaint
              </p>
            </div>

            <div className="space-y-0">

              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4"
                >

                  {/* Timeline Icon + Line */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        item.completed
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    {index !== timeline.length - 1 && (
                      <div className="w-px h-14 bg-slate-200" />
                    )}

                  </div>

                  {/* Timeline Content */}
                  <div className="pb-7">

                    <h3
                      className={`text-sm font-semibold ${
                        item.completed
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {item.description}
                    </p>

                    {item.date && (
                      <p className="text-xs text-slate-400 mt-2">
                        {item.date}
                      </p>
                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Student Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900 mb-5">
              Student Information
            </h2>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                P
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {complaint.student}
                </p>

                <p className="text-xs text-slate-400">
                  Student
                </p>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <User size={16} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Email
                </p>
              </div>

              <p className="text-sm font-medium text-slate-700 mt-2">
                {complaint.email}
              </p>
            </div>

          </div>

          {/* Complaint Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900 mb-5">
              Complaint Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {complaint.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Priority
                </p>

                <span className="inline-block mt-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                  {complaint.priority}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Assigned To
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  Rahul Kumar
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StaffComplaintDetails;