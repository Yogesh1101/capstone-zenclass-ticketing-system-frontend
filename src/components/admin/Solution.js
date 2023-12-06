import { TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { API } from "../API_LINK";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function Solution(props) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendSolution = async () => {
    setLoading(true);
    const res = await fetch(`${API}/admin/solution/${props.ticket._id}`, {
      method: "PUT",
      body: JSON.stringify({ message, status: "Resolved" }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setLoading(false);
    if (data.message) {
      navigate("/admin/resolved-tickets");
    } else {
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
          <h3 className="m-0 p-0">Solution for {props.ticket.title}</h3>
        </Modal.Title>
      </Modal.Header>
      <form className="w-100">
        <Modal.Body>
          <h5 className="mb-4">
            Given Description - {props.ticket.description}
          </h5>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Enter Your Solution Here"
              multiline
              fullWidth
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
            />
          </div>
          {err ? <p className="text-danger text-center">{err}</p> : null}
        </Modal.Body>
        <Modal.Footer>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="error"
            onClick={() => sendSolution()}
            endIcon={<SendRoundedIcon />}
            loadingPosition="end"
            style={{ color: "white", border: "none" }}
          >
            <span>Send Solution</span>
          </LoadingButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Solution;
