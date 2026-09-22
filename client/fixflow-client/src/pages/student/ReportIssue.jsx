import {
  FileText,
  MapPin,
  ImagePlus,
  ArrowLeft,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

function ReportIssue() {
  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8">
        <Link
        to="/student/dashboard"
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4">
            <ArrowLeft size={17} />
            Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-900">
          Report a Maintenance Issue
        </h1>

        <p className="text-slate-500 mt-1">
          Describe the issue and provide its location so it can be resolved.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

        {/* Description */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <FileText size={17} className="text-blue-600" />
            Issue Description
          </label>

          <textarea
            rows="5"
            placeholder="Describe the maintenance issue..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <p className="text-xs text-slate-400 mt-2">
            Please provide enough details to help the maintenance team understand the issue.
          </p>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <MapPin size={17} className="text-blue-600" />
            Location
          </label>

          <input
            type="text"
            placeholder="e.g. Hostel Block A, Room 204"
            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <p className="text-xs text-slate-400 mt-2">
            Enter the room, block, floor, or other relevant location.
          </p>
        </div>

        {/* Photo */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <ImagePlus size={17} className="text-blue-600" />
            Photo
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
            <ImagePlus
              size={30}
              className="mx-auto text-slate-400 mb-3"
            />

            <p className="text-sm font-medium text-slate-600">
              Upload a photo of the issue
            </p>

            <p className="text-xs text-slate-400 mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20">
            Submit Complaint
            <Send size={17} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReportIssue;