import React, { useState } from "react";
import { TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { API } from "../API_LINK";
import { LoadingButton } from "@mui/lab";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const Feedback = (props) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [err, setErr] = useState("");

  const sendFeedback = async () => {
    setLoading(true);
    const res = await fetch(`${API}/user/edit/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({ feedback, status: "Closed" }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.data) {
      setLoading(false);
      window.location.reload(false);
      props.onHide();
    } else {
      setLoading(false);
      setErr(data.error);
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
          <h3 className="m-0 p-0">Close Query - {props.title}</h3>
        </Modal.Title>
      </Modal.Header>
      <form className="w-100">
        <Modal.Body>
          <h3 className="mb-4 text-success">FEEDBACK</h3>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Enter Your Feedback Here"
              multiline
              fullWidth
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              variant="outlined"
            />
            {err === "" ? null : (
              <p className="w-100 text-danger text-center">{err}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="error"
            onClick={() => sendFeedback()}
            endIcon={<CloseRoundedIcon />}
            loadingPosition="end"
            style={{ color: "white", border: "none" }}
          >
            <span>Close Query</span>
          </LoadingButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
