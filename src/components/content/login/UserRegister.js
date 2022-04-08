import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    isLoggedIn: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    makeCall(user);
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    const username = document.querySelector(`input[name="username"]`).value;
    const password = document.querySelector(`input[name="password"]`).value;
    await setUser((prev) => ({
      ...prev,
      username,
      password,
      isLoggedIn: true,
    }));
  }

  async function makeCall(user) {
    await fetch(`http://localhost:8000/api/v1/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const sessionId = uuidV4();
          localStorage.setItem("session_id", sessionId);
          if (user.isLoggedIn) {
            //navigate("/",{replace: true});
            window.location = "/";
          }
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="register">
      <h1>Create Account</h1>
      <hr />
      <form onSubmit={handleSubmit} className="form-register">
        <p>
          <label>
            Username <input type="text" name="username" id="username" />
          </label>
        </p>
        <p>
          <label>
            Password&nbsp;{" "}
            <input type="password" name="password" id="password" />
          </label>
        </p>
        <p>
          <button type="button" className="reg-user" onClick={handleSubmit}>
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
