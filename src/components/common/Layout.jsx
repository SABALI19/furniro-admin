import React from 'react';
import Header from './Header';
import SideBar from './SideBar';

function Layout({ title, action, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideBar />
      
      <main className="flex-1 overflow-y-auto">
        <Header title={title} action={action} />
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
