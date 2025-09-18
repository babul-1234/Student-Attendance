
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.css";

const AdminRegister = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/register", {
        username,
        password,
      });

      setMessage(res.data.message || "Registration successful!");
      alert("Registration Successful!");

      // ✅ Mark logged in
      setIsLoggedIn(true);

      // ✅ Redirect to dashboard instead of landing page
      navigate("/dashboard");
    } catch (error) {
      const errMsg = error.response?.data?.error || "Registration failed";
      setMessage(errMsg);
      alert(errMsg);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Admin Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegister;

