import React from "react";

const DashboardLayout = ({ sidebar, topbar, content }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-4">
      {/* Sidebar: spans full height on medium screens */}
      <aside className="row-start-1 row-end-2 md:col-span-1 bg-blue-900 text-white p-6">
        {sidebar}
      </aside>

      <div className="row-start-2 md:col-span-3">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {topbar}
        </header>

        {/* Main Content Area */}
        <main className="p-6 bg-gray-100">
          {content}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
