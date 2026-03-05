import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  const navItems = [
    { to: "/admin/dashboard", icon: "DB", label: "Dashboard" },
    { to: "/admin/furniture", icon: "PR", label: "Products" },
    { to: "/admin/orders", icon: "OR", label: "Orders" },
    { to: "/admin/users", icon: "US", label: "Users" },
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Furniro Admin</h1>
      </div>
      <nav className="mt-6 space-y-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <span className="mr-3 text-xs font-semibold text-gray-500">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default SideBar;
