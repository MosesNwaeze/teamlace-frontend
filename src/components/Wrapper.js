import React, { Component } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MainContent from "../components/content/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../components/content/products/Product";
import Login from "../components/content/login/Login";
import Home from "../components/content/home/Home";
import AddProduct from "./content/products/AddProduct";
class Wrapper extends Component {
  render() {
    const sessionId = localStorage.getItem("session_id");
    const isLoggedIn = sessionId ? true : false;

    return (
      <div className="wrapper">
        <BrowserRouter>
          <Sidebar user={isLoggedIn} />
          <Routes>
            <Route path="/" element={<MainContent />}>
              <Route element={<Home />} index />
              <Route path="products" element={<Products />} />
              <Route path="login/*" element={<Login />} />
              <Route path="products/add-product" element={<AddProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Wrapper;
