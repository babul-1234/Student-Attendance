const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecret"; // you can move this to .env

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();
const PORT =  5000;

app.use(cors({
    origin: ["http://localhost:3000",
        "https://srijan-web.netlify.app"
    ]
}));
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Srijan@123",
    database: "student_attendance_db"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
});
const performanceRoute = require("./PerformanceRoute")(db);
app.use("/performance", performanceRoute);




// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Srijan@123",
//     database: "student_attendance_db"
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log("MySQL connected");
// });

// Add Student
app.post("/students", (req, res) => {
    const { name, roll, department } = req.body;
    const sql = "INSERT INTO students (name, roll, department) VALUES (?, ?, ?)";
    db.query(sql, [name, roll, department], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student added successfully" });
    });
});

// Mark Attendance
app.post("/attendance", (req, res) => {
    const { roll, date, status } = req.body;
    const sql = "INSERT INTO attendance (roll, date, status) VALUES (?, ?, ?)";
    db.query(sql, [roll, date, status], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Attendance marked" });
    });
});

// View Student Performance & Attendance
// app.get("/student/:roll", (req, res) => {
//     const roll = req.params.roll;
//     const sql = `
//         SELECT s.name, s.roll, s.department, a.date, a.status
//         FROM students s
//         LEFT JOIN attendance a ON s.roll = a.roll
//         WHERE s.roll = ?`;
//     db.query(sql, [roll], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json(result);
//     });
// });


// app.get("/student/:roll", (req, res) => {
//     const roll = req.params.roll;

//     // First: Fetch student info
//     const studentSql = "SELECT * FROM students WHERE roll = ?";
//     db.query(studentSql, [roll], (err, studentResults) => {
//         if (err) return res.status(500).json({ error: "Database error" });
//         if (studentResults.length === 0) return res.status(404).json({ error: "Student not found" });

//         const student = studentResults[0];

//         // Second: Fetch attendance records
//         const attendanceSql = "SELECT date, status FROM attendance WHERE roll = ?";
//         db.query(attendanceSql, [roll], (err, attendanceResults) => {
//             if (err) return res.status(500).json({ error: "Attendance fetch error" });

//             const totalDays = attendanceResults.length;
//             const presentDays = attendanceResults.filter(a => a.status.toLowerCase() === "present").length;
//             const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : "0.00";

//             // Final response
//             res.json({
//                 name: student.name,
//                 roll: student.roll,
//                 department: student.department,
//                 attendance: attendanceResults,
//                 presentDays,
//                 totalDays,
//                 percentage: `${percentage}%`
//             });
//         });
//     });
// });
app.get("/student/:roll", (req, res) => {
    const roll = req.params.roll;

    // Step 1: Fetch student info
    const studentSql = "SELECT * FROM students WHERE roll = ?";
    db.query(studentSql, [roll], (err, studentResults) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (studentResults.length === 0) return res.status(404).json({ error: "Student not found" });

        const student = studentResults[0];

        // Step 2: Fetch attendance records
        const attendanceSql = "SELECT date, status FROM attendance WHERE roll = ?";
        db.query(attendanceSql, [roll], (err, attendanceResults) => {
            if (err) return res.status(500).json({ error: "Attendance fetch error" });

            const totalDays = attendanceResults.length;
            const presentDays = attendanceResults.filter(a => a.status.toLowerCase() === "present").length;
            const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : "0.00";

            // Step 3: Fetch performance records
            const performanceSql = "SELECT subject, marks FROM performance WHERE roll = ?";
            db.query(performanceSql, [roll], (err, performanceResults) => {
                if (err) return res.status(500).json({ error: "Performance fetch error" });

                // Final Combined Response
                res.json({
                    name: student.name,
                    roll: student.roll,
                    department: student.department,
                    attendance: attendanceResults,
                    presentDays,
                    totalDays,
                    percentage: `${percentage}%`,
                    performance: performanceResults // Include subject + marks
                });
            });
        });
    });
});



app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admins WHERE username = ?";

    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(401).json({ error: "User not found" });

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});


app.post("/admin/register", (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO admins (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "User already exists or error inserting" });
        }
        res.json({ message: "Admin registered successfully" });
    });
});





app.listen(PORT, () => {
    console.log(`server is runnin of port ${PORT}`);

})
    
