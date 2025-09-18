import axios from "axios";
import { useState } from "react";
import './App.css';
const AddPerformance = () => {
  const [form, setForm] = useState({
    roll: "",
    subject: "",
    marks: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/performance/add", form);
      alert("Performance added!"); // ✅ This alert will pop up
      setMessage(res.data.message);
      setForm({ roll: "", subject: "", marks: "" }); // clear form
    } catch (error) {
      console.error(error);
      alert("Error adding performance.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Student Performance</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Roll Number"
          value={form.roll}
          onChange={(e) => setForm({ ...form, roll: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
          required
        />
        <button type="submit">Add</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default AddPerformance;
