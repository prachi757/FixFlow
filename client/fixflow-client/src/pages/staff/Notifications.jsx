import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Bell,
  ClipboardCheck,
  CheckCircle2,
  CheckCheck,
  Loader2,
  XCircle,
} from "lucide-react";

function StaffNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notifications",
        { withCredentials: true }
      );

      setNotifications(response.data);
      setError("");
    } catch (error) {
      console.error("Fetch notifications error:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark one notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );

      toast.success("Notification marked as read.");
    } catch (error) {
      console.error("Mark as read error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to mark notification as read."
      );
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axios.patch(
        "http://localhost:5000/api/notifications/read-all",
        {},
        { withCredentials: true }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error("Mark all as read error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to mark all notifications as read."
      );
    }
  };

  // Format notification date
  const formatTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "assigned":
        return <ClipboardCheck size={20} />;

      case "closed":
        return <CheckCircle2 size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Stay updated about your assigned complaints.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>

      </div>

      {/* Notifications */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">
            Recent Notifications
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Updates related to your assigned complaints
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={28} />
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4">
            <XCircle className="mx-auto text-red-500 mb-2" size={28} />

            <p className="text-sm text-red-500 break-words">
              {error}
            </p>

            <button
              onClick={fetchNotifications}
              className="text-sm text-blue-600 font-semibold mt-3 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Bell className="mx-auto text-slate-300 mb-3" size={32} />

            <p className="text-sm text-slate-500">
              No notifications yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">

            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() =>
                  !notification.isRead && markAsRead(notification._id)
                }
                className={`p-4 sm:p-5 flex gap-3 sm:gap-4 hover:bg-slate-50/60 transition cursor-pointer min-w-0 ${
                  !notification.isRead ? "bg-blue-50/30" : ""
                }`}
              >

                {/* Icon */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    notification.type === "assigned"
                      ? "bg-blue-50 text-blue-600"
                      : notification.type === "closed"
                      ? "bg-green-50 text-green-600"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-start justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-slate-800 break-words">
                          {notification.title}
                        </h3>

                        {!notification.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>

                      <p className="text-sm text-slate-500 mt-1 break-words">
                        {notification.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        {formatTime(notification.createdAt)}
                      </p>

                    </div>

                    <Bell
                      size={17}
                      className="text-slate-300 shrink-0 mt-1"
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Footer */}
      {!loading && !error && notifications.length > 0 && (
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-sm text-slate-400">
            You're all caught up.
          </p>
        </div>
      )}

    </div>
  );
}

export default StaffNotifications;