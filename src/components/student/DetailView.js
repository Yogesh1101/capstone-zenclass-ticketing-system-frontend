import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { API } from "../API_LINK";

export const DetailView = (props) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [studentMsg, setStudentMsg] = useState("");

  const openQueryAgain = async () => {
    setLoading(true);
    const res = await fetch(`${API}/user/edit/${props.ticket._id}`, {
      method: "PUT",
      body: JSON.stringify({ studentMsg, status: "Open" }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.message) {
      console.log(data);
      setLoading(false);
      window.location.reload(false);
      props.onHide();
    } else {
      setErr(data.error);
      setLoading(false);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="m-0 p-0">
            <span className="text-danger">INFO - </span>
            <span className="fw-bold">{props.ticket.title}</span>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <form className="w-100">
        <Modal.Body>
          <div className="row w-100 mb-lg-4 mb-2">
            <div className="col-lg-6 col-12">
              <h3 className="mb-2 text-warning">Title</h3>
              <h5>{props.ticket.title}</h5>
            </div>
            <div className="col-lg-6 col-12">
              <h3 className="mb-2 text-warning ">Desctiprion</h3>
              <h5>{props.ticket.description}</h5>
            </div>
          </div>
          <div className="row w-100 mb-lg-4 mb-2">
            <div className="col-lg-6 col-12">
              <h3 className="mb-2  text-warning ">Status</h3>
              <h5>{props.ticket.status}</h5>
            </div>
            <div className="col-lg-6 col-12">
              <h3 className="mb-2 text-warning ">Solution</h3>
              <h5>{props.ticket.message}</h5>
            </div>
          </div>
          <div className="w-100">
            {props.ticket.status === "Closed" ||
            props.ticket.status === "Open" ? null : (
              <div className="row">
                <div className="col-12 mb-2 text-warning">
                  If Solution is not satisfied!
                </div>
                <div className="col-12">
                  <TextField
                    type="text"
                    label="Enter Question"
                    fullWidth
                    multiline
                    rows={2}
                    value={studentMsg}
                    onChange={(e) => setStudentMsg(e.target.value)}
                  />
                  {err === "" ? null : (
                    <p className="w-100 text-danger text-center">{err}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {props.ticket.status === "Closed" ? (
            <Button variant="contained" style={{ color: "black" }} disabled>
              Query Closed
            </Button>
          ) : (
            <div>
              {props.ticket.status === "Open" ? (
                <Button variant="contained" style={{ color: "black" }} disabled>
                  Waiting for Solution...
                </Button>
              ) : (
                <div className="w-100 d-flex justify-content-end">
                  <LoadingButton
                    onClick={() => openQueryAgain()}
                    loading={loading}
                    variant="contained"
                    color="success"
                    endIcon={<ReplayRoundedIcon />}
                    loadingPosition="end"
                    style={{ color: "white" }}
                  >
                    <span>Open Query Again</span>
                  </LoadingButton>
                </div>
              )}
            </div>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};
