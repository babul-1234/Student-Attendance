


import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div>
      <h2>Admin </h2>


      <nav>
        <Link to="addstudent">Add Student</Link> |{" "}
        <Link to="attendance">Mark Attendance</Link> |{" "}
        <Link to="view">View Student</Link> |{" "}
        <Link to="add-performance">Add Marks</Link> |{" "}
        <Link to="view-performance">View Marks</Link>
      </nav>

      <div style={{ marginTop: "20px" }}>
        {/* ✅ Nested routes will load here */}
        <Outlet />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Dashboard;
