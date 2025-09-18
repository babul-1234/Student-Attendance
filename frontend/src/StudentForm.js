import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        roll_no: '',
        department: '',
        semester: '',
        email: ''
    });
    const [editId, setEditId] = useState(null);

    const loadStudents = async() => {
        const res = await axios.get('http://localhost:5000/api/students');
        setStudents(res.data);
    };

    useEffect(() => { loadStudents(); }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:5000/api/students/${editId}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/students', formData);
        }
        setFormData({ name: '', roll_no: '', department: '', semester: '', email: '' });
        setEditId(null);
        loadStudents();
    };

    const handleEdit = (student) => {
        setFormData(student);
        setEditId(student.id);
    };

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        loadStudents();
    };

    return ( <
        div className = "student-form" >
        <
        h2 > { editId ? 'Edit Student' : 'Add Student' } < /h2> <
        form onSubmit = { handleSubmit } >
        <
        input placeholder = "Name"
        value = { formData.name }
        onChange = {
            (e) => setFormData({...formData, name: e.target.value }) }
        required / >
        <
        input placeholder = "Roll No"
        value = { formData.roll_no }
        onChange = {
            (e) => setFormData({...formData, roll_no: e.target.value }) }
        required / >
        <
        input placeholder = "Department"
        value = { formData.department }
        onChange = {
            (e) => setFormData({...formData, department: e.target.value }) }
        /> <
        input placeholder = "Semester"
        type = "number"
        value = { formData.semester }
        onChange = {
            (e) => setFormData({...formData, semester: e.target.value }) }
        /> <
        input placeholder = "Email"
        value = { formData.email }
        onChange = {
            (e) => setFormData({...formData, email: e.target.value }) }
        /> <
        button type = "submit" > { editId ? 'Update' : 'Add' } < /button> <
        /form>

        <
        h3 > All Students < /h3> <
        table >
        <
        thead >
        <
        tr > < th > Name < /th><th>Roll</th > < th > Dept < /th><th>Sem</th > < th > Email < /th><th>Actions</th > < /tr> <
        /thead> <
        tbody > {
            students.map((s) => ( <
                tr key = { s.id } >
                <
                td > { s.name } < /td><td>{s.roll_no}</td > < td > { s.department } < /td><td>{s.semester}</td > < td > { s.email } < /td> <
                td >
                <
                button onClick = {
                    () => handleEdit(s) } > Edit < /button> <
                button onClick = {
                    () => handleDelete(s.id) } > Delete < /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
};

export default StudentForm;