import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  useLogoutMutation } from '../../redux/api/authApi';

const SidebarMenu = ({ menuItems }) => {


   const navigate = useNavigate();
    const [logout] = useLogoutMutation();
  
  
    const logoutHandler = async () => {
      await logout().unwrap();
      // await logout().unwrap();
      navigate("/"); // Refresh page
    };
  

  return (
    <div className="list-group">
      {menuItems.map((item, index) => {
        if (item.name === "Logout") {
          return (
            <NavLink
              key={index}
              to="!#"
              onClick={(e) => {
                e.preventDefault();
                logoutHandler();
              }}
              className="list-group-item list-group-item-action d-flex align-items-center gap-2"
            >
              <i className={`${item.icon} fa-fw`}></i>
              <span className="fw-semibold">{item.name}</span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={index}
            to={item.url}
            className={({ isActive }) =>
              `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                isActive ? 'active bg-danger text-white border-danger' : ''
              }`
            }
          >
            <i className={`${item.icon} fa-fw`}></i>
            <span className="fw-semibold">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
