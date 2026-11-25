import { useState } from "react";
import {
  FileText,
  MapPin,
  ImagePlus,
  ArrowLeft,
  Send,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function ReportIssue() {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    photo: null,
  });

  const [error, setError] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle photo selection
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please select a PNG or JPG image.");
      toast.error("Please select a PNG or JPG image.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size should not exceed 5MB.");
      toast.error("Image size should not exceed 5MB.");
      e.target.value = "";
      return;
    }

    setError("");

    setFormData({
      ...formData,
      photo: selectedFile,
    });
  };

  // Remove selected photo
  const removePhoto = () => {
    setFormData({
      ...formData,
      photo: null,
    });

    const fileInput = document.getElementById("complaint-photo");
    if (fileInput) fileInput.value = "";

    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check empty spaces
    if (!formData.description.trim()) {
      toast.error("Please enter issue description.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter complaint location.");
      return;
    }

    try {
      const complaintData = new FormData();

      complaintData.append("description", formData.description.trim());
      complaintData.append("location", formData.location.trim());

      if (formData.photo) {
        complaintData.append("photo", formData.photo);
      }

      const response = await axios.post(
        "http://localhost:5000/api/student/complaints",
        complaintData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Reset form after successful response
      setFormData({
        description: "",
        location: "",
        photo: null,
      });

      const fileInput = document.getElementById("complaint-photo");
      if (fileInput) fileInput.value = "";

      toast.success("Complaint submitted successfully!");

    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message || "Failed to submit complaint.";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6 sm:mb-8">

        <Link
          to="/student/dashboard"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Report a Maintenance Issue
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Describe the issue and provide its location so it can be resolved.
        </p>

      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 lg:p-8"
      >

        {/* Description */}
        <div className="mb-6">

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <FileText size={17} className="text-blue-600 shrink-0" />
            Issue Description
          </label>

          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the maintenance issue..."
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <p className="text-xs text-slate-400 mt-2 leading-5">
            Please provide enough details to help the maintenance team understand the issue.
          </p>

        </div>

        {/* Location */}
        <div className="mb-6">

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <MapPin size={17} className="text-blue-600 shrink-0" />
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Hostel Block A, Room 204"
            required
            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <p className="text-xs text-slate-400 mt-2 leading-5">
            Enter the room, block, floor, or other relevant location.
          </p>

        </div>

        {/* Photo */}
        <div className="mb-7 sm:mb-8">

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <ImagePlus size={17} className="text-blue-600 shrink-0" />
            Photo
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <label
            htmlFor="complaint-photo"
            className="block border-2 border-dashed border-slate-200 rounded-xl p-5 sm:p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer"
          >

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

            <input
              id="complaint-photo"
              name="photo"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handlePhotoChange}
              className="hidden"
            />

          </label>

          {/* Selected Photo */}
          {formData.photo && (
            <div className="mt-3 flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3">

              <div className="flex items-center gap-2 min-w-0">
                <ImagePlus size={18} className="text-blue-600 shrink-0" />

                <span className="text-sm text-slate-600 truncate">
                  {formData.photo.name}
                </span>
              </div>

              <button
                type="button"
                onClick={removePhoto}
                className="text-slate-400 hover:text-red-500 shrink-0"
              >
                <X size={18} />
              </button>

            </div>
          )}

          {/* Validation Error */}
          {error && (
            <p className="text-sm text-red-500 mt-2 break-words">
              {error}
            </p>
          )}

        </div>

        {/* Submit */}
        <div className="flex justify-stretch sm:justify-end">

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20 w-full sm:w-auto"
          >
            Submit Complaint
            <Send size={17} />
          </button>

        </div>

      </form>

    </div>
  );
}

export default ReportIssue;