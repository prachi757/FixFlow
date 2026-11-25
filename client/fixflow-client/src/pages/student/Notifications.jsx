import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Bell,
  UserCheck,
  PlayCircle,
  CheckCircle2,
  CheckCheck,
  RotateCcw,
  XCircle,
  Loader2,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/notifications",
        { withCredentials: true }
      );

      setNotifications(response.data);
    } catch (error) {
      console.error("Fetch notifications error:", error);

      setError(
        error.response?.data?.message || "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark one notification as read
  const handleMarkAsRead = async (id) => {
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
  const handleMarkAllAsRead = async () => {
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
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Notification icons
  const getNotificationIcon = (type) => {
    switch (type) {
      case "assigned":
        return <UserCheck size={20} />;

      case "started":
        return <PlayCircle size={20} />;

      case "resolved":
        return <CheckCircle2 size={20} />;

      case "reopened":
        return <RotateCcw size={20} />;

      case "rejected":
        return <XCircle size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  // Notification icon colors
  const getIconStyle = (type) => {
    switch (type) {
      case "assigned":
        return "bg-blue-50 text-blue-600";

      case "started":
        return "bg-indigo-50 text-indigo-600";

      case "resolved":
        return "bg-emerald-50 text-emerald-600";

      case "reopened":
        return "bg-orange-50 text-orange-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-50 text-slate-600";
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
            Stay updated on your maintenance complaints.
          </p>
        </div>

        <button
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>

      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden min-w-0">

        {/* Card Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">

          <h2 className="font-semibold text-slate-900">
            Recent Notifications
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Updates about your complaints
          </p>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
            <Loader2
              size={22}
              className="animate-spin mr-2 shrink-0"
            />
            Loading notifications...
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4">

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
          <div className="text-center py-16 px-4">

            <Bell
              size={32}
              className="mx-auto text-slate-300 mb-3"
            />

            <p className="text-sm font-medium text-slate-600">
              No notifications yet
            </p>

            <p className="text-xs text-slate-400 mt-1">
              You'll see updates about your complaints here.
            </p>

          </div>
        ) : (
          /* Notification List */
          <div className="divide-y divide-slate-100">

            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() =>
                  !notification.isRead &&
                  handleMarkAsRead(notification._id)
                }
                className={`p-4 sm:p-5 flex gap-3 sm:gap-4 transition min-w-0 ${
                  !notification.isRead
                    ? "bg-blue-50/30 cursor-pointer hover:bg-blue-50/60"
                    : "hover:bg-slate-50/60"
                }`}
              >

                {/* Icon */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${getIconStyle(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-start justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2 min-w-0">

                        <h3 className="text-sm font-semibold text-slate-800 break-words">
                          {notification.title}
                        </h3>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}

                      </div>

                      <p className="text-sm text-slate-500 mt-1 leading-6 break-words">
                        {notification.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-2 break-words">
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

      {/* Bottom Message */}
      {!loading && !error && notifications.length > 0 && (
        <div className="text-center mt-6 sm:mt-8 px-2">

          <p className="text-xs sm:text-sm text-slate-400">
            {unreadCount === 0
              ? "You're all caught up."
              : `You have ${unreadCount} unread notification${
                  unreadCount > 1 ? "s" : ""
                }.`}
          </p>

        </div>
      )}

    </div>
  );
}

export default Notifications;