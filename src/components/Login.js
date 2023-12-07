import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "./API_LINK";
import * as yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid Email Address")
    .required("Why not? Fill the Email!"),
  password: yup
    .string()
    .min(4, "Atleast 4 characters required")
    .max(10, "Too many characters")
    .required("Why not? Fill the Password!"),
});

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);

  const checkToken = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    } else {
      const res = await fetch(`${API}/user/userDetails`, {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.data.role === "admin") {
        navigate("/admin/home");
      } else if (data.data.role === "student") {
        navigate("/student/home");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      loginUser(values);
    },
  });

  const loginUser = async (values) => {
    await fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setLoading(false);
          setErr(data.message);
          localStorage.setItem("token", data.token);
          if (data.role === "admin") {
            navigate("/admin/home");
          } else {
            navigate("/student/home");
          }
        } else {
          setLoading(false);
          setErr(data.error);
        }
      });
  };

  return (
    <div
      id="login-main"
      className="h-100 w-100 d-flex align-items-center justify-content-center"
    >
      <div className="login-container container p-5 d-flex flex-column align-items-start justify-content-center border-0 rounded-4">
        <h1 className="login-welcome fw-bold m-0 text-uppercase">
          Welcome Back
        </h1>
        <h3 className="login-title mb-4">
          Zen Class Ticketing System for Query Resolving
        </h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="login-text mb-5 fw-bolder text-uppercase text-decoration-underline">
            Login
          </div>
          <div className="mb-3">
            <TextField
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              fullWidth
              label="Enter Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <TextField
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              label="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-danger">{formik.errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <p className="mb-4">
              Don't have Account?{" "}
              <span onClick={() => navigate("/")} className="login-dont">
                Click Here to Create...
              </span>
            </p>
          </div>
          <div>
            <div>
              {err ? (
                <Typography className="mb-3" color={"error"}>
                  {err}
                </Typography>
              ) : null}
            </div>
            <div>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                className="login-btn shadow-lg"
                endIcon={<LoginIcon />}
                loadingPosition="end"
                style={{ color: "white" }}
              >
                <span>Submit</span>
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
