import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';


const AdminLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });

      setMessage(res.data.message || "Login successful!");
      alert("Login Successful!");

      // ✅ Mark logged in
      setIsLoggedIn(true);

      // ✅ Redirect to dashboard instead of landing page
      navigate("/dashboard");
    } catch (error) {
      const errMsg = error.response?.data?.error || "Login failed";
      setMessage(errMsg);
      alert(errMsg);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;

