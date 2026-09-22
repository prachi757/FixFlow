import {
  ArrowLeft,
  MapPin,
  UserRound,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

function ComplaintDetails() {
  const complaint = {
    id: "CF-1008",
    title: "Ceiling fan not working",
    description:
      "The ceiling fan in my room is not working properly and stops after a few minutes.",
    location: "Hostel Block A, Room 204",
    category: "Electrical",
    priority: "Medium",
    assignedStaff: "Rahul Kumar",
    status: "In Progress",
  };

  const timeline = [
    {
      title: "Complaint Submitted",
      description: "Your complaint was submitted successfully.",
      date: "18 Sep 2026, 10:30 AM",
      completed: true,
    },
    {
      title: "Complaint Assigned",
      description: "The complaint was assigned to maintenance staff.",
      date: "18 Sep 2026, 12:15 PM",
      completed: true,
    },
    {
      title: "Work Started",
      description: "Maintenance staff has started working on the issue.",
      date: "18 Sep 2026, 2:00 PM",
      completed: true,
    },
    {
      title: "Resolved",
      description: "The maintenance work will be marked resolved after completion.",
      date: "",
      completed: false,
    },
    {
      title: "Student Confirmation",
      description: "You will be able to confirm the resolution or reopen the complaint.",
      date: "",
      completed: false,
    },
  ];

  return (
    <div className="p-6">

      {/* Back */}
      <Link
        to="/student/my-complaints"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={17} />
        Back to My Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <p className="text-sm font-medium text-blue-600">
            {complaint.id}
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {complaint.title}
          </h1>

          <p className="text-slate-500 mt-1">
            Submitted on 18 Sep 2026
          </p>
        </div>

        <span className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold">
          <Clock3 size={16} />
          {complaint.status}
        </span>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6">

        {/* Left */}
        <div className="space-y-6">

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900 mb-4">
              Complaint Details
            </h2>

            <p className="text-sm text-slate-600 leading-7">
              {complaint.description}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-100">

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5" />

                <div>
                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {complaint.location}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900 mb-6">
              Complaint Timeline
            </h2>

            <div className="space-y-0">

              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="relative flex gap-4"
                >

                  {/* Line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-[9px] top-6 w-px h-full bg-slate-200" />
                  )}

                  {/* Circle */}
                  <div className="relative z-10 shrink-0">
                    {item.completed ? (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <CheckCircle2 size={13} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
                        <Circle size={8} className="text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
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

                    <p className="text-xs text-slate-500 mt-1 leading-5">
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

        {/* Right */}
        <div className="space-y-6">

          {/* Complaint Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900 mb-5">
              Complaint Information
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="text-sm font-medium text-slate-700 mt-1">
                  {complaint.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Priority
                </p>

                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                  {complaint.priority}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Assigned Staff
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <UserRound size={16} className="text-slate-400" />

                  <p className="text-sm font-medium text-slate-700">
                    {complaint.assignedStaff}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Submitted
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays size={16} className="text-slate-400" />

                  <p className="text-sm font-medium text-slate-700">
                    18 Sep 2026
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Resolution Action */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">

            <h2 className="font-semibold text-slate-900">
              Resolution
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              Once the maintenance staff marks this complaint as resolved,
              you can confirm whether the issue has actually been fixed.
            </p>

            <div className="mt-4 text-xs text-blue-600 font-medium">
              Confirmation options will appear after resolution.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;