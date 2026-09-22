import { Bell, Search } from "lucide-react";

function StaffNavbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      
      {/* Left Side */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Staff Dashboard
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Manage and resolve your assigned maintenance complaints
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 w-64 h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        {/* Staff Profile */}
        <div className="flex items-center gap-3 pl-2">

          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
            R
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Rahul Kumar
            </p>

            <p className="text-xs text-slate-400">
              Maintenance Staff
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}

export default StaffNavbar;