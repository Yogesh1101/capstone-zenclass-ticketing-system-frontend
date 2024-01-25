import React, { useEffect, useState } from "react";
import { API } from "../API_LINK";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../LoadingScreen";
import "./adminStyle.css";

export const AdminDashboard = () => {
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

  const finalName = name.split(" ").join("");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div className="admin-main-div">
      {load ? (
        <div className="admin-loading-div d-flex justify-content-center align-items-center">
          <LoadingScreen h={"15%"} w={"5%"} c={"#14A44D"} />
        </div>
      ) : (
        <div id="admin-main-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-warning px-0">
            <div className="container-fluid">
              <NavLink className="navbar-brand fs-3" to="/admin/home">
                Dashboard
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#adminNavbar"
                aria-controls="#adminNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="adminNavbar">
                <ul className="navbar-nav me-auto mb-2 text-center mb-lg-0 w-100 d-flex justify-content-end fs-5">
                  <li className="nav-item">
                    <NavLink to="/admin/home">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/open-tickets">Open Tickets</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/resolved-tickets">
                      Resolved Tickets
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/closed-tickets">Closed Tickets</NavLink>
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
                {finalName}
              </span>
            </h1>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
