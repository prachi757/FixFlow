import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Search,
  ClipboardList,
  ArrowRight,
  Clock3,
  Wrench,
  CheckCircle2,
  UserCheck,
  RotateCcw,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Fetch all complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/complaints",
          { withCredentials: true }
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Fetch complaints error:", error);

        const errorMessage =
          error.response?.data?.message ||
          "Failed to load complaints.";

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Apply search and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      complaint._id.toLowerCase().includes(searchText) ||
      (complaint.studentId?.name || "")
        .toLowerCase()
        .includes(searchText) ||
      complaint.description.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" ||
      complaint.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      complaint.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Status badge
  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold whitespace-nowrap">
          <Clock3 size={14} />
          Pending
        </span>
      );
    }

    if (status === "Assigned") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold whitespace-nowrap">
          <UserCheck size={14} />
          Assigned
        </span>
      );
    }

    if (status === "In Progress") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold whitespace-nowrap">
          <Wrench size={14} />
          In Progress
        </span>
      );
    }

    if (status === "Resolved") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold whitespace-nowrap">
          <CheckCircle2 size={14} />
          Resolved
        </span>
      );
    }

    if (status === "Reopened") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold whitespace-nowrap">
          <RotateCcw size={14} />
          Reopened
        </span>
      );
    }

    if (status === "Closed") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold whitespace-nowrap">
          <CheckCircle2 size={14} />
          Closed
        </span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold whitespace-nowrap">
          Rejected
        </span>
      );
    }

    return (
      <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold whitespace-nowrap">
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Complaints
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Review and manage maintenance complaints submitted by students.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="w-full min-w-0 h-11 flex items-center gap-2 px-3 bg-slate-50 border border-slate-200 rounded-xl">
            <Search size={18} className="text-slate-400 shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by complaint ID, student or issue..."
              className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full lg:w-auto h-11 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Reopened</option>
              <option>Closed</option>
              <option>Rejected</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full lg:w-auto h-11 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none"
            >
              <option>All Categories</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Furniture</option>
              <option>Cleaning</option>
              <option>Infrastructure</option>
            </select>

          </div>
        </div>
      </div>

      {/* Complaint List */}
      <div className="space-y-4">

        {loading ? (
          <p className="text-center text-slate-500 py-10">
            Loading complaints...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            {error}
          </p>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            No complaints found.
          </p>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5">

                {/* Complaint Information */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">

                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ClipboardList size={20} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs text-slate-400 break-words">
                      {complaint.studentId?.name || "Unknown Student"}
                    </p>

                    <h2 className="text-sm sm:text-base font-semibold text-slate-800 mt-1 break-words">
                      {complaint.description}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1 break-words">
                      {complaint.location}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">

                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                        {complaint.category}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          complaint.priority === "High"
                            ? "bg-red-50 text-red-600"
                            : complaint.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {complaint.priority} Priority
                      </span>

                    </div>
                  </div>
                </div>

                {/* Status + View */}
                <div className="flex items-center justify-between sm:justify-start gap-3 xl:pl-6 xl:shrink-0">

                  {getStatusBadge(complaint.status)}

                  <Link
                    to={`/admin/complaints/${complaint._id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
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

export default AdminComplaints;