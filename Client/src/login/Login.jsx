import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.css";
import { useAuth } from "../Auth/AuthContext.jsx";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const notifysuccess = () => {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const notifyerror = () => {
    toast.error("Failed to login", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    
  }
 

  const { login } = useAuth(); 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        login(data.user); 
        notifysuccess();
        navigate("/");
      } else {
        setError(data.message);
        notifyerror();
      }
    } catch (e) {
      setError(e.message);
      notifyerror();
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        <p className="signup-link">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
