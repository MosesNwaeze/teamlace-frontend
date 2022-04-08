import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../content/login/Login";
import Products from "../content/products/Product";
import Home from "../content/home/Home";
import AddProduct from "../content/products/AddProduct";

class MainContent extends Component {
  render() {
    return (
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="login/*" element={<Login />} />
          <Route path="products/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    );
  }
}

export default MainContent;
