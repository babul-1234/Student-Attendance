

// import axios from "axios";
// import { useState } from "react";

// // import "./ViewStudent.css"; // Optional for custom styling

// function ViewStudent() {
//   const [roll, setRoll] = useState("");
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");

//   const fetchStudent = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/student/${roll}`);
//       setStudent(res.data);
//       setError("");
//     } catch (err) {
//       setError("Student not found");
//       setStudent(null);
//     }
//   };

//   return (
//     <div className="view-student">
//       <h2>View Student Details</h2>
//       <input
//         type="text"
//         placeholder="Enter Roll Number"
//         value={roll}
//         onChange={(e) => setRoll(e.target.value)}
//       />
//       <button onClick={fetchStudent}>Search</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {student && (
//         <div className="student-details">
//           <h3>Student Info</h3>
//           <p><strong>Name:</strong> {student.name}</p>
//           <p><strong>Roll:</strong> {student.roll}</p>
//           <p><strong>Department:</strong> {student.department}</p>

//           <h3>Attendance Summary</h3>
//           <p><strong>Total Days:</strong> {student.totalDays}</p>
//           <p><strong>Present Days:</strong> {student.presentDays}</p>
//           <p><strong>Percentage:</strong> {student.percentage}</p>

//           <h4>Attendance Records</h4>
//           <ul>
//             {student.attendance.map((att, index) => (
//               <li key={index}>{att.date} - {att.status}</li>
//             ))}
//           </ul>

//           <h3>Performance</h3>
//           {student.performance.length === 0 ? (
//             <p>No performance records found.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Subject</th>
//                   <th>Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {student.performance.map((p, index) => (
//                   <tr key={index}>
//                     <td>{p.subject}</td>
//                     <td>{p.marks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewStudent;





import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

function ViewStudent() {
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/student/${roll}`);
      setStudent(res.data);
      setError("");
    } catch (err) {
      setError("Student not found");
      setStudent(null);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Report", 14, 15);

    doc.text(`Name: ${student.name}`, 14, 30);
    doc.text(`Roll: ${student.roll}`, 14, 40);
    doc.text(`Department: ${student.department}`, 14, 50);
    doc.text(`Attendance %: ${student.percentage}%`, 14, 60);
    doc.text(`Total Days: ${student.totalDays}`, 14, 70);
    doc.text(`Present Days: ${student.presentDays}`, 14, 80);

    // Attendance Table
    if (student.attendance.length > 0) {
      const attendanceRows = student.attendance.map((a) => [a.date, a.status]);
      autoTable(doc, {
        head: [["Date", "Status"]],
        body: attendanceRows,
        startY: 90,
      });
    }

    // Performance Table
    let perfStartY = doc.lastAutoTable?.finalY + 10 || 110;
    if (student.performance.length > 0) {
      const perfRows = student.performance.map((p) => [p.subject, p.marks]);
      autoTable(doc, {
        head: [["Subject", "Marks"]],
        body: perfRows,
        startY: perfStartY,
      });
    }

    doc.save(`${student.roll}_report.pdf`);
  };

  return (
    <div className="view-student">
      <h2>View Student Details</h2>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />
      <button onClick={fetchStudent}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {student && (
        <div className="student-details">
          <h3>Student Info</h3>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll:</strong> {student.roll}</p>
          <p><strong>Department:</strong> {student.department}</p>

          <h3>Attendance Summary</h3>
          <p><strong>Total Days:</strong> {student.totalDays}</p>
          <p><strong>Present Days:</strong> {student.presentDays}</p>
          <p><strong>Percentage:</strong> {student.percentage}</p>

          <h4>Attendance Records</h4>
          <ul>
            {student.attendance.map((att, index) => (
              <li key={index}>{att.date} - {att.status}</li>
            ))}
          </ul>

          <h3>Performance</h3>
          {student.performance.length === 0 ? (
            <p>No performance records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {student.performance.map((p, index) => (
                  <tr key={index}>
                    <td>{p.subject}</td>
                    <td>{p.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <br />
          <button  style={{
              marginTop: "15px",
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }} onClick={exportPDF}>Export PDF</button>
        </div>
      )}
    </div>
  );
}

export default ViewStudent;
