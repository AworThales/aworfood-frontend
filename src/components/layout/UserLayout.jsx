import React from 'react';
import SidebarMenu from './SidebarMenu';

const UserLayout = ({ children }) => {
    const menuItems = [
      {
        name: "Profile",
        url: "/me/profile",
        icon: "fas fa-user",
      },
      {
        name: "Update Profile",
        url: "/me/update_profile",
        icon: "fas fa-user-edit",
      },
      {
        name: "Upload Avatar",
        url: "/me/upload_avatar",
        icon: "fas fa-user-circle",
      },
      {
        name: "Update Password",
        url: "/me/update_password",
        icon: "fas fa-lock",
      },
      {
        name: "Logout",
        url: "/logout",
        icon: "fas fa-sign-out-alt fa-fw",
      },
    ];
  
  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <div className="py-5 bg-white border-bottom shadow-sm">
        <h2 className="text-center fw-bold mb-0">User Settings</h2>
      </div>

      {/* Main Layout */}
      <div className="container py-4">
        <div className="row g-4 justify-content-center">
          {/* Sidebar Menu */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <SidebarMenu menuItems={menuItems} />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-8 col-lg-8">
            <div className="bg-white rounded shadow-sm p-4 user-dashboard">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
