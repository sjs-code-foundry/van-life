import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { loginUser } from "../api";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();

  const message = location.state?.message;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);

    async function handleLogin(creds) {
      try {
        const data = await loginUser(creds);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    handleLogin(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {message && <p className="login-message shimmer">{message}</p>}
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
