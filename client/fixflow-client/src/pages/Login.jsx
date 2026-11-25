import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import {
  LockKeyhole,
  Mail,
  Wrench,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [collegeEmail, setCollegeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          collegeEmail: collegeEmail.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      const user = response.data.user;

      if (!user) {
        setError("User details not received.");
        toast.error("User details not received.");
        return;
      }

      if (user.role === "admin") {
        login(user);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else if (user.role === "student") {
        login(user);
        toast.success("Login successful!");
        navigate("/student/dashboard");
      } else if (user.role === "staff") {
        login(user);
        toast.success("Login successful!");
        navigate("/staff/dashboard");
      } else {
        setError("Invalid user role.");
        toast.error("Invalid user role.");
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(errorMessage);
      toast.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-3 sm:p-6">

      <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-2xl sm:rounded-[28px] shadow-[0_25px_80px_rgba(15,23,42,0.12)] overflow-hidden grid lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT SIDE */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-12 lg:p-14 flex flex-col justify-between">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute bottom-[-100px] left-[-80px] w-80 h-80 rounded-full bg-indigo-400/20" />

          <div className="absolute top-1/2 right-[-50px] w-28 h-28 rounded-full border border-white/20" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                <Wrench size={23} strokeWidth={2.2} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  FixFlow
                </h1>

                <p className="text-xs text-blue-100 mt-0.5">
                  Maintenance Management
                </p>
              </div>

            </div>

            {/* Hero Content */}
            <div className="mt-12 sm:mt-20 lg:mt-28 max-w-lg">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-2 text-xs font-medium mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                College & Hostel Maintenance
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight">
                Report.
                <br />
                Track.
                <span className="text-blue-200"> Resolve.</span>
              </h2>

              <p className="mt-5 sm:mt-7 text-blue-100 text-base sm:text-lg leading-7 sm:leading-8 max-w-md">
                One simple platform to report maintenance issues,
                track their progress, and get them resolved efficiently.
              </p>

            </div>

            {/* Features */}
            <div className="mt-8 sm:mt-10 space-y-3">

              <div className="flex items-center gap-3 text-sm text-blue-50">
                <CheckCircle2 size={18} className="shrink-0" />
                Centralized complaint tracking
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-50">
                <CheckCircle2 size={18} className="shrink-0" />
                Transparent complaint status
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-50">
                <CheckCircle2 size={18} className="shrink-0" />
                Student-to-staff workflow
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-blue-100/80">
            <span>FixFlow © 2026</span>
            <span>Built for smarter campus maintenance</span>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-5 sm:p-12 lg:p-16">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-7 sm:mb-9">

              <div className="lg:hidden w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6">
                <Wrench size={22} />
              </div>

              <p className="text-sm font-semibold text-blue-600 mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Sign in to FixFlow
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-3 leading-6">
                Use your college credentials to access your account.
              </p>

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  College Email
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    placeholder="Enter your college email"
                    required
                    className="w-full h-12 sm:h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full h-12 sm:h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 break-words">
                  {error}
                </p>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
              >
                {loading ? "Signing In..." : "Sign In"}

                {!loading && (
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>

            </form>

            {/* Secure Access */}
            <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-slate-100">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <LockKeyhole size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700">
                    Secure access
                  </p>

                  <p className="text-xs text-slate-400 mt-1 leading-5">
                    Student and staff accounts are provided by
                    the college administrator.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;