import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  FileText,
  Wand2,
  Send,
  PenTool,
  ChevronLeft,
  ChevronRight,
  Gift,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className={`h-[calc(100vh-64px)] bg-white border-r transition-all duration-300
      ${collapsed ? "w-16" : "w-64"} flex flex-col justify-between`}
    >
      {/* TOP */}
      <div>
        {/* LOGO + TOGGLE */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <span className="text-xl font-bold text-indigo-600"></span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* NAV */}
        <nav className="space-y-1 px-2">
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/jobs" className={linkClass}>
            <Search size={18} />
            {!collapsed && "Job Search"}
          </NavLink>

          <NavLink to="/ai/cv" className={linkClass}>
            <FileText size={18} />
            {!collapsed && "AI CV Generator"}
          </NavLink>

          <NavLink to="/ai/cover-letter" className={linkClass}>
            <PenTool size={18} />
            {!collapsed && "AI Cover Letter"}
          </NavLink>

          <NavLink to="/ai/auto-apply" className={linkClass}>
            <Send size={18} />
            {!collapsed && "AI Auto Application"}
          </NavLink>

          <NavLink to="/ai/tailored" className={linkClass}>
            <Wand2 size={18} />
            {!collapsed && "AI Tailored Application"}
          </NavLink>

          <NavLink to="/my-docs" className={linkClass}>
            <FileText size={18} />
            {!collapsed && "My Docs"}
          </NavLink>

          <NavLink to="/refer-earn" className={linkClass}>
            <Gift size={18} />
            {!collapsed && "Refer & Earn"}
          </NavLink>
        </nav>
      </div>

      {/* UPGRADE BOX */}
      {!collapsed && (
        <div className="m-3 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
          <p className="font-semibold mb-1">⚡ Unlock More Features</p>
          <p className="text-xs mb-3 opacity-90">
            Upgrade to get unlimited AI tools.
          </p>
          <button className="w-full bg-white text-indigo-600 text-sm font-semibold py-2 rounded-lg">
            Upgrade Now
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
