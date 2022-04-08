import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const UserLogin = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    makeCall(user);
  }, [user]);

  async function makeCall(user) {
    await fetch(`http://localhost:8000/api/v1/login`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const sessionId = uuidV4();
          localStorage.setItem("session_id", sessionId);
          if (user.isLoggedIn) {
            //return navigate("/", { replace: true });
            window.location = "/";
          }
        }
      })
      .catch((error) => console.log(error));
  }

  async function handleSubmit() {
    const username = document.querySelector(`input[name="username"]`).value;
    const password = document.querySelector(`input[name="password"]`).value;
    await setUser((prev) => ({
      ...prev,
      username,
      password,
      isLoggedIn: true,
    }));
  }

  return (
    <div className="register">
      <h1>Login</h1>
      <hr />
      <form className="form-register">
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
          <button
            type="button"
            className="submit"
            onClick={handleSubmit}
            id="login"
            data-testid="login"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
