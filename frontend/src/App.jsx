
import { useState } from "react";
import {
  Link,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddPerformance from "./AddPerformance";
import AddStudent from "./AddStudent";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";


import Landingpage from "./Landingpage";
import MarkAttendance from "./MarkAttendance";
import ViewPerformance from "./ViewPerformance";
import ViewStudent from "./ViewStudent";

// Dashboard Layout
const Dashboard = ({ setIsLoggedIn }) => {
  return (
    <div className="container">
      <h2>Admin DashBoard</h2>
      <br/>
      <br/>
      <nav>
        <Link to="addstudent">Add Student</Link> |{" "}
        <Link to="attendance">Mark Attendance</Link> |{" "}
        <Link to="view">View Student</Link> |{" "}
        <Link to="add-performance">Add Marks</Link> |{" "}
        <Link to="view-performance">View Marks</Link> |{" "}
        {/* <button onClick={() => setIsLoggedIn(false)}>Logout</button> */}
       
      </nav>
      

      <div style={{ marginTop: "20px" }}>
        {/* Nested pages render here */}
        <Outlet />
         
      </div>
     
    </div>
  );
};


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/login"
          element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<AdminRegister setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Private Dashboard (only when logged in) */}
        {isLoggedIn && (
          <Route
            path="dashboard"
            element={<Dashboard setIsLoggedIn={setIsLoggedIn} />}
          >
            {/* ✅ Default page when visiting /dashboard */}
            {/* <Route index element={<h1>Welcome to the Dashboard</h1>} /> */}

            <Route path="addstudent" element={<AddStudent />} />
            <Route path="attendance" element={<MarkAttendance />} />
            <Route path="view" element={<ViewStudent />} />
            <Route path="add-performance" element={<AddPerformance />} />
            <Route path="view-performance" element={<ViewPerformance />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;

