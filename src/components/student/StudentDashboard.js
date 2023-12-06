import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { API } from "../API_LINK";
import { LoadingScreen } from "../LoadingScreen";
import "./studentStyle.css";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [load, setLoad] = useState(true);
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
      setName(data.data.name);
      setLoad(false);
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div className="student-main-div">
      {load ? (
        <div className="student-loading-div d-flex justify-content-center align-items-center">
          <LoadingScreen h={"15%"} w={"5%"} c={"#14A44D"} />
        </div>
      ) : (
        <div id="studentmain-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-warning px-0">
            <div className="container-fluid">
              <NavLink className="navbar-brand fs-3" to="/student/home">
                Dashboard
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#studentNavbar"
                aria-controls="#studentNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="studentNavbar">
                <ul className="navbar-nav me-auto mb-2 text-center  mb-lg-0 w-100 d-flex justify-content-end fs-5">
                  <li className="nav-item">
                    <NavLink to="/student/home">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/student/create">Create Ticket</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink onClick={handleLogout} to="/login">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container mt-5">
            <h1 className="text-center">
              WELCOME{" "}
              <span className="welcome-name text-uppercase text-decoration-underline link-underline-warning ">
                {name}
              </span>
            </h1>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
