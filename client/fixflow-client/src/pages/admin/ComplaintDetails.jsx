import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  User,
  Sparkles,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

function AdminComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form values
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    assignedTo: "",
  });

  const [staffList, setStaffList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Reject confirmation modal
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Fetch complaint details
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/complaints/${id}`,
          { withCredentials: true }
        );

        const data = response.data;

        setComplaint(data);

        setFormData({
          category: data.category || "",
          priority: data.priority || "",
          assignedTo: data.assignedTo?._id || data.assignedTo || "",
        });
      } catch (error) {
        console.error("Fetch complaint error:", error);

        const errorMessage =
          error.response?.data?.message ||
          "Failed to fetch complaint.";

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  // Fetch staff list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users",
          { withCredentials: true }
        );

        const users = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];

        setStaffList(users.filter((user) => user.role === "staff"));
      } catch (error) {
        console.error("Failed to fetch staff:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load maintenance staff."
        );
      }
    };

    fetchStaff();
  }, []);

  // Update form values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Verify complaint and assign staff
  const handleVerifyAssign = async () => {
    if (!formData.assignedTo) {
      const errorMessage = "Please select a staff member.";

      setActionMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
      return;
    }

    try {
      setSaving(true);
      setActionMessage(null);

      const response = await axios.patch(
        `http://localhost:5000/api/admin/complaints/${id}`,
        formData,
        { withCredentials: true }
      );

      setComplaint(response.data.complaint);

      setFormData({
        category: response.data.complaint.category,
        priority: response.data.complaint.priority,
        assignedTo:
          response.data.complaint.assignedTo?._id ||
          response.data.complaint.assignedTo ||
          "",
      });

      setActionMessage({
        type: "success",
        text: response.data.message,
      });

      toast.success(
        response.data.message || "Complaint verified and assigned successfully!"
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to verify and assign complaint.";

      setActionMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Reject complaint
  const handleRejectComplaint = async () => {
    try {
      setSaving(true);
      setActionMessage(null);

      const response = await axios.patch(
        `http://localhost:5000/api/admin/complaints/${id}`,
        { status: "Rejected" },
        { withCredentials: true }
      );

      setComplaint(response.data.complaint);

      setActionMessage({
        type: "success",
        text: response.data.message,
      });

      toast.success(
        response.data.message || "Complaint rejected successfully!"
      );

      setShowRejectModal(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reject complaint.";

      setActionMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        Loading complaint...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 text-red-600 break-words">
        {error}
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

  // Admin can take action on Pending and Reopened complaints
  const canTakeAction =
    ["Pending", "Reopened"].includes(complaint.status) &&
    !complaint.assignedTo;

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 sm:p-6 shadow-xl">

            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <XCircle size={25} />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Reject Complaint?
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              Are you sure you want to reject this complaint?
              Once rejected, it cannot be verified or assigned again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                disabled={saving}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleRejectComplaint}
                disabled={saving}
                className="flex-1 h-11 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Back */}
      <Link
        to="/admin/complaints"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-5 sm:mb-6"
      >
        <ArrowLeft size={17} />
        Back to Complaints
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 sm:mb-8">

        <div className="min-w-0">

          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold whitespace-nowrap">
              <Clock3 size={13} />
              {complaint.status}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
            {complaint.description}
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Review complaint details and take necessary action.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* MAIN CONTENT */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">

          {/* Complaint Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5 sm:mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ClipboardList size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">
                  Complaint Details
                </h2>

                <p className="text-xs text-slate-400">
                  Information submitted by the student
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Description
                </p>

                <p className="text-sm text-slate-700 leading-6 break-words">
                  {complaint.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Location
                </p>

                <div className="flex items-start gap-2 text-sm text-slate-700 min-w-0">
                  <MapPin
                    size={17}
                    className="text-slate-400 shrink-0 mt-0.5"
                  />
                  <span className="break-words">
                    {complaint.location}
                  </span>
                </div>
              </div>

              {complaint.photo && (
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-2">
                    Attached Photo
                  </p>

                  <img
                    src={complaint.photo}
                    alt="Complaint"
                    className="w-full sm:max-w-md max-h-80 rounded-xl border border-slate-200 object-contain object-left"
                  />
                </div>
              )}

            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5 sm:mb-6">

              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">
                  AI Suggested Classification
                </h2>

                <p className="text-xs text-slate-400">
                  Review the AI suggestion before assigning the complaint.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Suggested Category
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.aiCategory}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Suggested Priority
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.aiPriority}
                </p>
              </div>

            </div>
          </div>

          {/* Final Classification */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="mb-5 sm:mb-6">
              <h2 className="font-semibold text-slate-900">
                Verify Complaint
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Admin can modify the AI suggestion before assigning staff.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={!canTakeAction || saving}
                  className="w-full h-11 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  disabled={!canTakeAction || saving}
                  className="w-full h-11 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 sm:space-y-6">

          {/* Student Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Student Information
                </h2>
              </div>

            </div>

            <div>
              <p className="text-xs text-slate-400">
                Submitted by
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
                {complaint.studentId?.name || "Unknown Student"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs text-slate-400">
                Submitted on
              </p>

              <p className="text-sm text-slate-700 mt-1 break-words">
                {new Date(complaint.createdAt).toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          {/* Assign Staff */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">
                  Assign Staff
                </h2>

                <p className="text-xs text-slate-400">
                  Select maintenance staff
                </p>
              </div>

            </div>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              disabled={!canTakeAction || saving}
              className="w-full h-11 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">Select Staff</option>

              {staffList.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} — {staff.specialization}
                </option>
              ))}
            </select>

            <p className="text-xs text-slate-400 mt-2">
              Staff specialization is shown to help with assignment.
            </p>

          </div>

          {/* Complaint Actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

            <h2 className="font-semibold text-slate-900 mb-4">
              Complaint Actions
            </h2>

            {actionMessage && (
              <p
                className={`text-sm mb-3 break-words ${
                  actionMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {actionMessage.text}
              </p>
            )}

            <div className="space-y-3">

              {canTakeAction ? (
                <>
                  <button
                    onClick={handleVerifyAssign}
                    disabled={saving}
                    className="w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={17} />
                    {saving ? "Saving..." : "Verify & Assign"}
                  </button>

                  <button
                    onClick={() => setShowRejectModal(true)}
                    disabled={saving}
                    className="w-full h-11 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <XCircle size={17} />
                    Reject Complaint
                  </button>
                </>
              ) : (
                <p className="text-sm text-slate-500 text-center">
                  {complaint.status === "Rejected"
                    ? "This complaint has been rejected."
                    : complaint.assignedTo
                    ? "This complaint has already been assigned."
                    : "No further actions available."}
                </p>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;