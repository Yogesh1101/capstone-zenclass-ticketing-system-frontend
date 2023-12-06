import React from "react";
import {
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";

function ResolvedTableBody({ ticket, index }) {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{index + 1}</StyledTableCell>
      <StyledTableCell align="left">{ticket._id}</StyledTableCell>
      <StyledTableCell align="left">{ticket.student.name}</StyledTableCell>
      <StyledTableCell align="left">{ticket.title}</StyledTableCell>
      <StyledTableCell align="left">{ticket.description}</StyledTableCell>
      <StyledTableCell align="left">{ticket.status}</StyledTableCell>
      <StyledTableCell align="left">{ticket.date}</StyledTableCell>
      <StyledTableCell align="left">{ticket.message}</StyledTableCell>
    </StyledTableRow>
  );
}

export default ResolvedTableBody;
