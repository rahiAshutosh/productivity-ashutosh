import React from "react";
import { useAuth } from "./AuthProvider";

const Layout = ({
  children,
}) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-container w-100">
      <div className="nav-bar w-100">
        <h1>Productivity</h1>
        <div className="actions">          
          {/* <div className="action">Welcome, {currentUser?.email || 'User'}</div> */}
          <div className="action" onClick={logout}>Logout</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;