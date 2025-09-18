import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");  // 🔐 Remove login token
    navigate("/admin-login");          // 🔁 Redirect to login page
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Welcome, Admin 👋</h2>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "16px",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
