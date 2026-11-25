import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student/complaints",
          {
            withCredentials: true,
          }
        );

        setComplaints(response.data.recentComplaints);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          My Complaints
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          View and track all your maintenance complaints.
        </p>
      </div>

      {/* Complaints */}
      <div className="space-y-4">

        {complaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">

            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={26} />
            </div>

            <h2 className="text-base font-semibold text-slate-800">
              No complaints found
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              You haven't submitted any maintenance complaints yet.
            </p>

            <Link
              to="/student/report-issue"
              className="inline-flex items-center gap-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              Report an Issue
              <ArrowRight size={16} />
            </Link>

          </div>
        ) : (

          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-sm transition-all"
            >

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Complaint Information */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ClipboardList size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-slate-800 mt-1 break-words">
                      {complaint.description}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1 break-words">
                      {complaint.location} •{" "}
                      {new Date(complaint.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                </div>

                {/* Status + View */}
                <div className="flex items-center justify-between sm:justify-end gap-4">

                  {complaint.status === "Pending" && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold shrink-0">
                      <Clock3 size={14} />
                      {complaint.status}
                    </span>
                  )}

                  {complaint.status === "In Progress" && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold shrink-0">
                      <Clock3 size={14} />
                      {complaint.status}
                    </span>
                  )}

                  {complaint.status === "Resolved" && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold shrink-0">
                      <CheckCircle2 size={14} />
                      {complaint.status}
                    </span>
                  )}

                  <Link
                    to={`/student/my-complaints/${complaint._id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0"
                  >
                    View
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </div>

            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default MyComplaints;