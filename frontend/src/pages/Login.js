import React, { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const login = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      navigate("/students");

    } catch (err) {

      alert("Invalid Username or Password");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "#f4f6f9"
      }}
    >

      <div
        className="card shadow border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "15px"
        }}
      >

        <div className="text-center mb-4">

          <h2 className="fw-bold">
            Student Management
          </h2>

          <p className="text-muted mb-0">
            Sign in to continue
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={login}>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Username
            </label>

            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-4">

          <small className="text-muted">
            ASP.NET Core + React CRUD Application
          </small>

        </div>

      </div>

    </div>
  );
}

export default Login;