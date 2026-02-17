import React from 'react';

function Header({ title, action }) {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-gray-700">
        {title || 'Dashboard'}
      </h2>

      {action && (
        <div>
          {action}
        </div>
      )}

      {!action && (
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <span className="text-sm text-gray-700">Admin</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
