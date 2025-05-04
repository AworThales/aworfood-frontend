import React from 'react'
import SidebarMenu from './SidebarMenu'

const AdminLayout = ({children}) => {
      const menuItems = [
        {
          name: "Dashboard",
          url: "/admin/dashboard",
          icon: "fas fa-tachometer-alt",
        },
        {
          name: "Create Food Menu",
          url: "/admin/food/create",
          icon: "fas fa-plus",
        },
        {
          name: "Food Menus",
          url: "/admin/foods",
          icon: "fab fa-product-hunt",
        },
        {
          name: "Orders",
          url: "/admin/orders",
          icon: "fas fa-receipt",
        },
        {
          name: "Users",
          url: "/admin/users",
          icon: "fas fa-user",
        },
        {
          name: "Reviews",
          url: "/admin/reviews",
          icon: "fas fa-star",
        },
        {
          name: "Home",
          url: "/",
          icon: "fas fa-home",
        },
        {
          name: "Logout",
          url: "/logout",
          icon: "fas fa-sign-out-alt",
        },
      ];
    

      return (
        <div className="d-flex flex-column min-vh-100">
          {/* Header */}
          <header className="bg-white py-4 border-bottom shadow-sm text-center">
            <h2 className="fw-bold mb-0">Admin Dashboard</h2>
          </header>
    
          {/* Body: Sidebar + Main */}
          <div className="d-flex flex-grow-1">
            {/* Sidebar */}
            <aside className="bg-white border-end p-3" style={{ width: '250px' }}>
              <SidebarMenu menuItems={menuItems} />
              
            </aside>
    
            {/* Main Content */}
            <main className="flex-grow-1 p-4 bg-light overflow-auto">
              <div className="bg-white rounded shadow-sm p-4 h-100">
                {children}
              </div>
            </main>
          </div>
        </div>
      );
    };
    
    export default AdminLayout;