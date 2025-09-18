import axios from "axios";
import { useState } from "react";

function MarkAttendance() {
  const [data, setData] = useState({ roll: "", date: "", status: "Present" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/attendance", data);
    alert("Attendance marked");
    setData({ roll: "", date: "", status: "Present" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mark Attendance</h2>
      <input type="text" placeholder="Roll" value={data.roll}
        onChange={(e) => setData({ ...data, roll: e.target.value })} required />
      <input type="date" value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })} required />
      <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit">Mark</button>
    </form>
  );
}

export default MarkAttendance;
