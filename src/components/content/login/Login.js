import React, { Component } from "react";
import UserAction from "./UserAction";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import { Routes, Route } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <UserAction />
        <Routes>
          <Route element={<UserLogin />} path="/" />
          <Route element={<UserRegister />} path="register" />
        </Routes>
      </div>
    );
  }
}

export default Login;
