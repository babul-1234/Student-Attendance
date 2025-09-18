import axios from "axios";
import { useEffect, useState } from "react";

const StudentInfo = ({ roll }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/student/${roll}`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error:", err);
        setData({ error: "Student not found or server error" });
      });
  }, [roll]);

  if (!data) return <p>Loading...</p>;
  if (data.error) return <p style={{ color: "red" }}>{data.error}</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{data.name} ({data.roll})</h2>
      <p><strong>Department:</strong> {data.department}</p>
      <p><strong>Attendance:</strong> {data.presentDays}/{data.totalDays} days</p>
      <p><strong>Percentage:</strong> {data.percentage}</p>

      <h4>Attendance Records:</h4>
      <ul>
        {data.attendance.map((entry, i) => (
          <li key={i}>
            {entry.date}: {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentInfo;
