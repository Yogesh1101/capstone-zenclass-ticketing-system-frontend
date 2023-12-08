import React, { useState } from "react";
import * as yup from "yup";
import { API } from "../API_LINK";
import { useFormik } from "formik";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { LoadingButton } from "@mui/lab";

const formValidationSchema = yup.object({
  title: yup
    .string()
    .min(4, "Atleast 4 characters required")
    .required("Why not? Fill the Title!"),
  description: yup
    .string()
    .min(10, "Atleast 10 characters required")
    .required("Why not? Fill the Description!"),
});

export const StudentCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      newTicket(values);
    },
  });
  const newTicket = async (values) => {
    const res = await fetch(`${API}/user/add`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = res.json();
    if (!data.error) {
      navigate("/student/home");
      setLoading(false);
    } else {
      setErr(data.error);
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h1>CreateTicket</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 w-75"
      >
        <div className="mb-4">
          <TextField
            id="title"
            name="title"
            type="text"
            fullWidth
            label="Enter Title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.title && formik.errors.title ? (
            <p className="text-danger">{formik.errors.title}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-4">
          <TextField
            id="description"
            name="description"
            type="text"
            fullWidth
            multiline
            rows={4}
            label="Enter Description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.description && formik.errors.description ? (
            <p className="text-danger">{formik.errors.description}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 text-center">
          {err ? (
            <Typography className="mb-3" color={"error"}>
              {err}
            </Typography>
          ) : null}
        </div>
        <div className="w-100 flex justify-content-center">
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            endIcon={<SendRoundedIcon />}
            loadingPosition="end"
            style={{ color: "white" }}
          >
            <span>Submit</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};
