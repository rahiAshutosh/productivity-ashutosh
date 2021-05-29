import React from "react";

const Layout = ({
  children,
}) => {
  return (
    <div className="app-container">
      <div className="nav-bar">
        <h1>Productivity</h1>
        <div className="actions">
          <div className="action">Login</div>
          <div className="action">Signup</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;