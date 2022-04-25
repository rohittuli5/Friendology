import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import '../index.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
                      onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
                      value={password}
                                onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
      </div>
  );
};

export default Login;