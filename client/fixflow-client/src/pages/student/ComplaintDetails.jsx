import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  ArrowLeft,
  MapPin,
  UserRound,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Image,
  RotateCcw,
  X,
  AlertCircle,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch particular complaint
  const fetchComplaint = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/student/complaints/${id}`,
        {
          withCredentials: true,
        }
      );

      setComplaint(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  // Open confirmation modal
  const openConfirmModal = (status) => {
    setSelectedAction(status);
    setShowConfirmModal(true);
  };

  // Close modal
  const closeConfirmModal = () => {
    if (actionLoading) return;

    setShowConfirmModal(false);
    setSelectedAction("");
  };

  // Student closes or reopens complaint
  const handleComplaintAction = async () => {
    try {
      setActionLoading(true);

      const response = await axios.patch(
        `http://localhost:5000/api/student/complaints/${id}`,
        { status: selectedAction },
        {
          withCredentials: true,
        }
      );

      setComplaint(response.data.complaint);
      setShowConfirmModal(false);
      setSelectedAction("");

      if (selectedAction === "Closed") {
        toast.success("Complaint closed successfully!");
      } else if (selectedAction === "Reopened") {
        toast.success("Complaint reopened successfully!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update complaint."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2
          className="animate-spin text-blue-600"
          size={32}
        />
      </div>
    );
  }

  // Error
  if (error || !complaint) {
    return (
      <div className="p-4 sm:p-6 min-w-0">
        <Link
          to="/student/my-complaints"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={17} />
          Back to My Complaints
        </Link>

        <div className="bg-white border border-red-200 rounded-2xl p-4 sm:p-6 text-red-600 break-words">
          {error || "Complaint not found"}
        </div>
      </div>
    );
  }

  // Status badge colors
  const statusColors = {
    Pending: "bg-amber-50 text-amber-600",
    Assigned: "bg-blue-50 text-blue-600",
    "In Progress": "bg-indigo-50 text-indigo-600",
    Resolved: "bg-green-50 text-green-600",
    Reopened: "bg-orange-50 text-orange-600",
    Closed: "bg-slate-100 text-slate-600",
    Rejected: "bg-red-50 text-red-600",
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Back */}
      <Link
        to="/student/my-complaints"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-5 sm:mb-6"
      >
        <ArrowLeft size={17} />
        Back to My Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 break-words">
            {complaint.description}
          </h1>

          <p className="text-slate-500 mt-2 text-xs sm:text-sm break-words">
            Submitted on {formatDate(complaint.createdAt)}
          </p>
        </div>

        <span
          className={`w-fit shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            statusColors[complaint.status] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          <Clock3 size={16} />
          {complaint.status}
        </span>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-4 sm:gap-6">

        {/* Left */}
        <div className="space-y-4 sm:space-y-6 min-w-0">

          {/* Complaint Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 min-w-0">

            <h2 className="font-semibold text-slate-900 mb-4">
              Complaint Details
            </h2>

            <p className="text-sm text-slate-600 leading-7 break-words">
              {complaint.description}
            </p>

            {complaint.photo && (
              <div className="mt-5 min-w-0">

                <div className="flex items-center gap-2 mb-3">
                  <Image
                    size={17}
                    className="text-blue-600 shrink-0"
                  />

                  <p className="text-sm font-medium text-slate-700">
                    Attached Photo
                  </p>
                </div>

                <img
                  src={complaint.photo}
                  alt="Complaint"
                  className="w-full max-w-md max-h-[400px] object-contain rounded-xl border border-slate-200"
                />

              </div>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100">

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="text-blue-600 mt-0.5 shrink-0"
                />

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-1 break-words">
                    {complaint.location}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 min-w-0">

            <h2 className="font-semibold text-slate-900 mb-6">
              Complaint Timeline
            </h2>

            <div className="space-y-0">

              {complaint.history?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative flex gap-3 sm:gap-4"
                >

                  {/* Timeline Line */}
                  {index !== complaint.history.length - 1 && (
                    <div className="absolute left-[9px] top-6 w-px h-full bg-slate-200" />
                  )}

                  {/* Circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <CheckCircle2 size={13} />
                    </div>
                  </div>

                  {/* Timeline Content */}
                  <div className="pb-7 min-w-0 flex-1">

                    <h3 className="text-sm font-semibold text-slate-800 break-words">
                      {item.status}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 leading-5 break-words">
                      {item.message}
                    </p>

                    {item.updatedBy?.name && (
                      <p className="text-xs text-slate-500 mt-1 break-words">
                        Updated by: {item.updatedBy.name}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 mt-2 break-words">
                      {formatDate(item.createdAt)}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* Right */}
        <div className="space-y-4 sm:space-y-6 min-w-0">

          {/* Complaint Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 min-w-0">

            <h2 className="font-semibold text-slate-900 mb-5">
              Complaint Information
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="text-sm font-medium text-slate-700 mt-1 break-words">
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

                <div className="flex items-center gap-2 mt-1 min-w-0">

                  <UserRound
                    size={16}
                    className="text-slate-400 shrink-0"
                  />

                  <p className="text-sm font-medium text-slate-700 break-words min-w-0">
                    {complaint.assignedTo?.name || "Not assigned yet"}
                  </p>

                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Submitted
                </p>

                <div className="flex items-start gap-2 mt-1 min-w-0">

                  <CalendarDays
                    size={16}
                    className="text-slate-400 shrink-0 mt-0.5"
                  />

                  <p className="text-sm font-medium text-slate-700 break-words min-w-0">
                    {formatDate(complaint.createdAt)}
                  </p>

                </div>
              </div>

            </div>
          </div>

          {/* Resolution */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-6 min-w-0">

            <h2 className="font-semibold text-slate-900">
              Resolution
            </h2>

            {complaint.status === "Resolved" ? (
              <>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Maintenance staff has marked this complaint as resolved.
                  Please confirm whether the issue has actually been fixed.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">

                  <button
                    onClick={() => openConfirmModal("Closed")}
                    disabled={actionLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition"
                  >
                    <CheckCircle2 size={17} />
                    Close Complaint
                  </button>

                  <button
                    onClick={() => openConfirmModal("Reopened")}
                    disabled={actionLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition"
                  >
                    <RotateCcw size={17} />
                    Reopen Complaint
                  </button>

                </div>
              </>
            ) : complaint.status === "Closed" ? (
              <p className="text-sm text-slate-500 mt-2 leading-6">
                You have confirmed that this complaint has been resolved.
              </p>
            ) : complaint.status === "Reopened" ? (
              <p className="text-sm text-slate-500 mt-2 leading-6">
                This complaint has been reopened because the issue needs
                further attention. It is now waiting for admin review.
              </p>
            ) : (
              <p className="text-sm text-slate-500 mt-2 leading-6">
                Once the maintenance staff marks this complaint as
                resolved, you can confirm whether the issue has
                actually been fixed.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">

          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 sm:p-6 relative animate-in fade-in zoom-in duration-200">

            {/* Close Icon */}
            <button
              onClick={closeConfirmModal}
              disabled={actionLoading}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Modal Icon */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
                selectedAction === "Closed"
                  ? "bg-green-50 text-green-600"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              {selectedAction === "Closed" ? (
                <CheckCircle2 size={28} />
              ) : (
                <AlertCircle size={28} />
              )}
            </div>

            {/* Modal Heading */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pr-6">
              {selectedAction === "Closed"
                ? "Close Complaint?"
                : "Reopen Complaint?"}
            </h2>

            {/* Modal Description */}
            <p className="text-sm text-slate-500 mt-3 leading-6">
              {selectedAction === "Closed"
                ? "Are you sure the issue has been resolved? Once you confirm, this complaint will be closed."
                : "Are you sure the issue is still not fixed? This complaint will be sent back to the admin for review."}
            </p>

            {/* Modal Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">

              <button
                onClick={closeConfirmModal}
                disabled={actionLoading}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleComplaintAction}
                disabled={actionLoading}
                className={`w-full sm:w-auto px-5 py-2.5 min-w-[110px] flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl transition disabled:opacity-60 ${
                  selectedAction === "Closed"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {actionLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Confirm"
                )}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ComplaintDetails;