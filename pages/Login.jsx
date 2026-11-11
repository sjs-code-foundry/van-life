import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginUser } from "../api";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);

    async function handleLogin(creds) {
      setStatus("submitting");
      setError(null);

      try {
        const data = await loginUser(creds);
        console.log(data);
        navigate("/host");
      } catch (err) {
        setError(err);
      } finally {
        setStatus("idle");
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
      {error?.message && (
        <p className="login-error-text">{`Error ${error.status} (${error.statusText}): ${error.message}`}</p>
      )}
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
        <button disabled={status === "submitting"}>
          {status === "idle" ? "Log in" : "Logging in..."}
        </button>
      </form>
    </div>
  );
}
