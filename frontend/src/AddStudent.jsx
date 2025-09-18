import axios from "axios";
import { useState } from "react";
import './App.css';
function AddStudent() {
  const [student, setStudent] = useState({ name: "", roll: "", department: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/students", student);
    alert("Student added");
    setStudent({ name: "", roll: "", department: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input type="text" placeholder="Name" value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })} required />
      <input type="text" placeholder="Roll" value={student.roll}
        onChange={(e) => setStudent({ ...student, roll: e.target.value })} required />
      <input type="text" placeholder="Department" value={student.department}
        onChange={(e) => setStudent({ ...student, department: e.target.value })} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddStudent;
