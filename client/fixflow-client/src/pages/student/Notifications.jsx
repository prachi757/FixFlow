import {
  Bell,
  UserCheck,
  PlayCircle,
  CheckCircle2,
  CheckCheck,
} from "lucide-react";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Complaint Assigned",
      message:
        "Your complaint CF-1008 has been assigned to Rahul Kumar.",
      time: "2 hours ago",
      type: "assigned",
      unread: true,
    },
    {
      id: 2,
      title: "Work Started",
      message:
        "Maintenance staff has started working on your complaint CF-1008.",
      time: "1 hour ago",
      type: "started",
      unread: true,
    },
    {
      id: 3,
      title: "Complaint Resolved",
      message:
        "Your complaint CF-1006 has been marked as resolved. Please confirm whether the issue has been fixed.",
      time: "Yesterday",
      type: "resolved",
      unread: false,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="text-slate-500 mt-1">
            Stay updated on your maintenance complaints.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50">
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">
            Recent Notifications
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Updates about your complaints
          </p>
        </div>

        {/* Notification List */}
        <div className="divide-y divide-slate-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 flex gap-4 hover:bg-slate-50/60 transition ${
                notification.unread ? "bg-blue-50/30" : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  notification.type === "assigned"
                    ? "bg-blue-50 text-blue-600"
                    : notification.type === "started"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {notification.type === "assigned" && (
                  <UserCheck size={20} />
                )}

                {notification.type === "started" && (
                  <PlayCircle size={20} />
                )}

                {notification.type === "resolved" && (
                  <CheckCircle2 size={20} />
                )}
              </div>

              {/* Notification Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {notification.title}
                      </h3>

                      {/* Unread indicator */}
                      {notification.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      {notification.time}
                    </p>
                  </div>

                  <Bell
                    size={17}
                    className="text-slate-300 shrink-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Message */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-400">
          You're all caught up.
        </p>
      </div>
    </div>
  );
}

export default Notifications;