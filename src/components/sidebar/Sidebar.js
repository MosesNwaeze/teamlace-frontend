import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLock, FaLockOpen } from "react-icons/fa";
import { Navigate } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    const _logout = window.confirm("Do you want to logout?");

    if (_logout) {
      this.setState(
        (prev) => ({ logout: true }),
        () => {
          this.clearSession();
        }
      );
    }
  }

  async clearSession() {
    await localStorage.clear();
    if (this.state.logout) {
      //return <Navigate to={`/login`} replace={true} />;
      window.location = "/login";
    }
  }
  render() {
    const { user } = this.props;
    const userStatus = user ? (
      <li className="navbar-item">
        <Link to="#" className="navbar-item logout" onClick={this.handleLogout} data-testid="logout">
          <FaLockOpen className="fa-icon" /> Logout
        </Link>
      </li>
    ) : (
      <li className="navbar-item">
        <Link to="login" className="navbar-item">
          <FaLock className="fa-icon" /> Login
        </Link>
      </li>
    );
    const showProducts = user ? (
      <li className="navbar-item">
        <Link to="" className="navbar-item">
          <FaHome className="fa-icon" /> {"  "}
          Products
        </Link>
      </li>
    ) : (
      ""
    );

    return (
      <div className="sidebar">
        <h1 className="header-title">Menu Items</h1>
        <div className="sidebar-content">
          <ul className="navbar">
            {showProducts}
            {userStatus}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
