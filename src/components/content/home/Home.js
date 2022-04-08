import React from "react";
import Products from "../products/Products";
import Login from "../login/Login";

const Home = () => {
  const sessionId = localStorage.getItem("session_id");
  
  let validUser = "";
  if (sessionId) {
    validUser = <Products />;
  } else {
    validUser = <Login />;
  }

  return validUser;
};

export default Home;
