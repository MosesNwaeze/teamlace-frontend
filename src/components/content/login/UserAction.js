import React from "react";
import { Link } from "react-router-dom";

const UserAction = () => {
  return (
    <nav className="h-nav">
      <Link to="/login" className="h-nav-item">Login</Link>
      <Link to="/login/register" className="h-nav-item">Create Account</Link>
      <hr/>
    </nav>
  );
};

export default UserAction;
