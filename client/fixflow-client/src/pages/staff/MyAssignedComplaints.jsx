import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function MyAssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/staff/complaints/all",
          {
            withCredentials: true,
          }
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Fetch assigned complaints error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load assigned complaints"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-amber-50 text-amber-600";
    }

    if (status === "In Progress") {
      return "bg-indigo-50 text-indigo-600";
    }

    if (status === "Resolved") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "Reopened") {
      return "bg-orange-50 text-orange-600";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-600";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          My Assigned Complaints
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          View and manage maintenance complaints assigned to you.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-500 text-sm">
            Loading assigned complaints...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm break-words">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && complaints.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">
          <ClipboardCheck
            size={36}
            className="mx-auto text-slate-300 mb-3"
          />

          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            No Assigned Complaints
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Complaints assigned to you will appear here.
          </p>
        </div>
      )}

      {/* Complaint List */}
      {!loading && !error && complaints.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-sm transition-all min-w-0"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-5">

                {/* Complaint Information */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ClipboardCheck size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-800 break-words">
                      {complaint.description}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1 break-words">
                      {complaint.location}
                    </p>

                    <p className="text-xs text-slate-400 mt-1 break-words">
                      Reported by {complaint.studentId?.name || "Student"}
                    </p>
                  </div>
                </div>

                {/* Complaint Details and View Button */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:flex-nowrap lg:shrink-0 lg:justify-end">

                  {/* Category */}
                  <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold whitespace-nowrap">
                    {complaint.category}
                  </span>

                  {/* Priority */}
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                      complaint.priority === "High"
                        ? "bg-red-50 text-red-600"
                        : complaint.priority === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {complaint.priority} Priority
                  </span>

                  {/* Status */}
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status === "Resolved" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock3 size={14} />
                    )}

                    {complaint.status}
                  </span>

                  {/* View Button */}
                  <Link
                    to={`/staff/complaints/${complaint._id}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    View
                    <ArrowRight size={16} />
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAssignedComplaints;