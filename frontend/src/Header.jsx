import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    onLogout(); // Remove token in parent
    navigate("/admin-login");
  };

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>🎓 Online Student Management</h2>
      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    margin: 0
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default Header;
