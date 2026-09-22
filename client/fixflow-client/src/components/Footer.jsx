function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        <div>
          <p className="text-sm font-semibold text-slate-700">
            FixFlow
          </p>

          <p className="text-xs text-slate-400 mt-1">
            College & Hostel Maintenance Management
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span>Student Portal</span>
          <span>•</span>
          <span>© 2026 FixFlow</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;