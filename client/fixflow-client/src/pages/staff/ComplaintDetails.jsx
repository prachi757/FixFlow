import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  ArrowLeft,
  MapPin,
  User,
  Wrench,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

function StaffComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch complaint details from backend
  const fetchComplaint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/staff/complaints/${id}`,
        { withCredentials: true }
      );

      setComplaint(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch complaint details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  // Update complaint status
  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      setError("");

      const response = await axios.patch(
        `http://localhost:5000/api/staff/complaints/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update complaint with latest backend data
      setComplaint(response.data.complaint);

      if (newStatus === "In Progress") {
        toast.success("Work started successfully!");
      } else if (newStatus === "Resolved") {
        toast.success("Complaint marked as resolved successfully!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update complaint status";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  // Format date and time
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

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 text-slate-500">
        Loading complaint details...
      </div>
    );
  }

  // Error state
  if (error && !complaint) {
    return (
      <div className="p-4 sm:p-6 min-w-0">
        <p className="text-red-600 break-words">{error}</p>

        <Link
          to="/staff/complaints"
          className="inline-flex items-center gap-2 text-sm text-blue-600 mt-4"
        >
          <ArrowLeft size={17} />
          Back to Assigned Complaints
        </Link>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="p-4 sm:p-6">
        Complaint not found.
      </div>
    );
  }

  const studentName = complaint.studentId?.name || "Unknown Student";

  const studentEmail =
    complaint.studentId?.collegeEmail || "Email not available";

  const staffName = complaint.assignedTo?.name || "Not assigned";

  // Timeline data from database history
  const timeline = complaint.history || [];

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Back */}
      <Link
        to="/staff/complaints"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-5 sm:mb-6"
      >
        <ArrowLeft size={17} />
        Back to Assigned Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              {complaint.status}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 break-words">
            {complaint.description}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Submitted on {formatDate(complaint.createdAt)}
          </p>
        </div>

        {/* Start Work Button */}
        {complaint.status === "Assigned" && (
          <button
            onClick={() => handleStatusUpdate("In Progress")}
            disabled={updating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition shrink-0"
          >
            {updating ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Wrench size={17} />
                Start Work
              </>
            )}
          </button>
        )}

        {/* Mark as Resolved Button */}
        {complaint.status === "In Progress" && (
          <button
            onClick={() => handleStatusUpdate("Resolved")}
            disabled={updating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition shrink-0"
          >
            {updating ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Mark as Resolved
              </>
            )}
          </button>
        )}

      </div>

      {/* PATCH Error */}
      {error && (
        <p className="text-sm text-red-600 mb-5 break-words">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* Main Content */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">

          {/* Complaint Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Wrench size={19} />
              </div>

              <div className="min-w-0">
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

              <p className="text-sm leading-6 text-slate-600 break-words">
                {complaint.description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6 flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-slate-50">

              <MapPin
                size={18}
                className="text-slate-400 mt-0.5 shrink-0"
              />

              <div className="min-w-0">
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1 break-words">
                  {complaint.location}
                </p>
              </div>

            </div>

            {/* Complaint Photo */}
            {complaint.photo && (
              <div className="mt-5 sm:mt-6">
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Attached Photo
                </p>

                <img
                  src={complaint.photo}
                  alt="Complaint"
                  className="w-full sm:max-w-md max-h-80 rounded-xl border border-slate-200 object-contain"
                />
              </div>
            )}

          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="mb-5 sm:mb-6">
              <h2 className="font-semibold text-slate-900">
                Complaint Timeline
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Track the progress of this complaint
              </p>
            </div>

            {timeline.length > 0 ? (
              <div className="space-y-0">

                {timeline.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex gap-3 sm:gap-4"
                  >

                    {/* Timeline Icon + Line */}
                    <div className="flex flex-col items-center shrink-0">

                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                        <CheckCircle2 size={18} />
                      </div>

                      {index !== timeline.length - 1 && (
                        <div className="w-px h-14 bg-slate-200" />
                      )}

                    </div>

                    {/* Timeline Content */}
                    <div className="pb-7 min-w-0 flex-1">

                      <h3 className="text-sm font-semibold text-slate-800 break-words">
                        {item.status}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1 break-words">
                        {item.message}
                      </p>

                      {item.updatedBy && (
                        <p className="text-xs text-slate-400 mt-2 break-words">
                          Updated by: {item.updatedBy.name || "User"}
                          {item.updatedBy.role
                            ? ` (${item.updatedBy.role})`
                            : ""}
                        </p>
                      )}

                      {item.createdAt && (
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(item.createdAt)}
                        </p>
                      )}

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No timeline history available.
              </p>
            )}

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-4 sm:space-y-6">

          {/* Student Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <h2 className="font-semibold text-slate-900 mb-5">
              Student Information
            </h2>

            <div className="flex items-center gap-3 mb-5 min-w-0">

              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold shrink-0">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 break-words">
                  {studentName}
                </p>

                <p className="text-xs text-slate-400">
                  Student
                </p>
              </div>

            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <User size={16} className="text-slate-400 shrink-0" />

                <p className="text-xs text-slate-400">
                  Email
                </p>
              </div>

              <p className="text-sm font-medium text-slate-700 mt-2 break-all">
                {studentEmail}
              </p>
            </div>

          </div>

          {/* Complaint Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <h2 className="font-semibold text-slate-900 mb-5">
              Complaint Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1 break-words">
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

                <p className="text-sm font-semibold text-slate-700 mt-1 break-words">
                  {staffName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Current Status
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {complaint.status}
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