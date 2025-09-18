import axios from "axios";
import { useState } from "react";

function ViewPerformance() {
  const [roll, setRoll] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5000/performance/${roll}`);
    setData(res.data);
  };

  return (
    <div>
      <h2>View Performance</h2>
      <input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Enter Roll" />
      <button onClick={fetchData}>Search</button>

      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr><th>Subject</th><th>Marks</th></tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}><td>{item.subject}</td><td>{item.marks}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewPerformance;
