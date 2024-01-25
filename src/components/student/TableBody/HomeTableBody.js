import React, { useState } from "react";
import { API } from "../../API_LINK";
import {
  Button,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LoadingButton } from "@mui/lab";
import { DetailView } from "../DetailView";
import { Feedback } from "../Feedback";

export function HomeTableBody({ ticket, index, getAllStudentTicket }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleDelete = () => {
    setDeleteLoading(true);
    fetch(`${API}/user/delete/${ticket._id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then(() => getAllStudentTicket());
    setDeleteLoading(false);
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{index + 1}</StyledTableCell>
      <StyledTableCell align="left">{ticket._id}</StyledTableCell>
      <StyledTableCell align="left">{ticket.title}</StyledTableCell>
      <StyledTableCell align="left">{ticket.description}</StyledTableCell>
      <StyledTableCell align="left">{ticket.status}</StyledTableCell>
      <StyledTableCell align="left">{ticket.date}</StyledTableCell>
      <StyledTableCell align="center">
        <LoadingButton
          onClick={() => {
            setInfoModal(true);
          }}
          variant="contained"
          color="success"
          endIcon={<InfoRoundedIcon />}
          loadingPosition="end"
          style={{ color: "white" }}
        >
          <span>DETAIL</span>
        </LoadingButton>
        <DetailView
          show={infoModal}
          onHide={() => setInfoModal(false)}
          ticket={ticket}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {ticket.status === "Closed" ? (
          <Button variant="contained" style={{ color: "black" }} disabled>
            Closed
          </Button>
        ) : (
          <div>
            <LoadingButton
              onClick={() => {
                setFeedbackModal(true);
              }}
              variant="contained"
              color={"warning"}
              endIcon={<CloseRoundedIcon />}
              loadingPosition="end"
              style={{ color: "white" }}
            >
              <span>CLOSE</span>
            </LoadingButton>
            <Feedback
              show={feedbackModal}
              onHide={() => setFeedbackModal(false)}
              id={ticket._id}
              title={ticket.title}
            />
          </div>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <LoadingButton
          onClick={() => {
            handleDelete();
          }}
          loading={deleteLoading}
          variant="contained"
          color="error"
          endIcon={<DeleteRoundedIcon />}
          loadingPosition="end"
          style={{ color: "white" }}
        >
          <span>DELETE</span>
        </LoadingButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
