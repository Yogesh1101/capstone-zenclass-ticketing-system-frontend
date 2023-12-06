import React, { useEffect, useState } from "react";
import { API } from "../API_LINK";
import { LoadingScreen } from "../LoadingScreen";
import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  TableContainer,
  TableBody,
} from "@mui/material";
import OpenTableBody from "./TableBody/OpenTableBody";

export const OpenTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(true);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const getOpenTickets = async () => {
    const res = await fetch(`${API}/admin/all-open-tickets`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (!data.data) {
      setErr(data.error);
      setLoad(false);
    } else {
      setTickets(data.data.reverse());
      setLoad(false);
    }
  };

  useEffect(() => {
    getOpenTickets();
  }, []);
  return (
    <div className="mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-5 text-uppercase"> Open Tickets</h2>
      <div className="w-100">
        {load ? (
          <div className="d-flex justify-content-center align-items-center">
            <LoadingScreen h={"15%"} w={"5%"} c={"#E4A11B"} />
          </div>
        ) : (
          <div className="w-100">
            {err === "" ? (
              <div className="w-100">
                {tickets.length === 0 ? (
                  <p className="w-100 text-danger text-center fs-3">
                    There is no Open Tickets to display
                  </p>
                ) : (
                  <TableContainer
                    component={Paper}
                    className="table-container table-responsive-xxl"
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">S.NO</StyledTableCell>
                          <StyledTableCell align="left">
                            TICKET ID
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            STUDENT
                          </StyledTableCell>
                          <StyledTableCell align="left">TITLE</StyledTableCell>
                          <StyledTableCell align="left">
                            DESCRIPTION
                          </StyledTableCell>
                          <StyledTableCell align="left">STATUS</StyledTableCell>
                          <StyledTableCell align="left">DATE</StyledTableCell>
                          <StyledTableCell align="left">
                            RESOLVED AGAIN
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            RESOLVE
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tickets.map((ticket, index) => (
                          <OpenTableBody
                            ticket={ticket}
                            index={index}
                            key={index}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            ) : (
              <p className="text-danger text-center">{err}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
