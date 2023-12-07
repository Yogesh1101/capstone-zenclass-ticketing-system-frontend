import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./API_LINK";
import * as yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";

const formValidationSchema = yup.object({
  name: yup.string().required("Why not? Fill the Full Name!"),
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

const Signup = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);

  const checkToken = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      createUser(values);
    },
  });

  const createUser = (newUser) => {
    fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setLoading(false);
          setErr(data.message);
          localStorage.setItem("token", data.token);
          alert(data.message);
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
      id="signup-main"
      className="h-100 w-100 d-flex align-items-center justify-content-center"
    >
      <div className="signup-container container p-5 d-flex flex-column align-items-start justify-content-center border-0 rounded-4">
        <h1 className="signup-welcome fw-bold m-0 text-uppercase">Welcome</h1>
        <h3 className="signup-title mb-4">
          Zen Class Ticketing System for Query Resolving
        </h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="signup-text mb-5 fw-bolder text-uppercase text-decoration-underline">
            Signup
          </div>
          <div className="mb-3">
            <TextField
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              label="Enter Username"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-danger">{formik.errors.name}</p>
            ) : (
              ""
            )}
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
              variant="outlined"
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
              Already a user !{" "}
              <span onClick={() => navigate("/login")} className="signup-user">
                Login
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

export default Signup;
