import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { AdminHome } from "./components/admin/AdminHome";
import { OpenTickets } from "./components/admin/OpenTickets";
import { ClosedTickets } from "./components/admin/ClosedTickets";
import { ResolvedTickets } from "./components/admin/ResolvedTickets";
import { StudentCreate } from "./components/student/StudentCreate";
import { StudentHome } from "./components/student/StudentHome";

function App() {
  // "build": "react-scripts build",
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="admin" element={<AdminDashboard />}>
          <Route path="home" element={<AdminHome />}></Route>
          <Route path="open-tickets" element={<OpenTickets />}></Route>
          <Route path="resolved-tickets" element={<ResolvedTickets />}></Route>
          <Route path="closed-tickets" element={<ClosedTickets />}></Route>
        </Route>

        <Route path="student" element={<StudentDashboard />}>
          <Route path="home" element={<StudentHome />}></Route>
          <Route path="create" element={<StudentCreate />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
