const express = require('express');

const app = express();

app.use(express.json());

// Mock student data
const students = [
    {
        id: 'ENG001',
        name: 'John Smith',
        department: 'Computer Science',
        gpa: 3.85
    },
    {
        id: 'ENG002',
        name: 'Sarah Johnson',
        department: 'Electrical Engineering',
        gpa: 3.92
    },
    {
        id: 'ENG003',
        name: 'Michael Chen',
        department: 'Mechanical Engineering',
        gpa: 3.78
    },
    {
        id: 'ENG004',
        name: 'Emma Davis',
        department: 'Computer Science',
        gpa: 3.95
    },
    {
        id: 'ENG005',
        name: 'James Wilson',
        department: 'Civil Engineering',
        gpa: 3.65
    },
    {
        id: 'ENG006',
        name: 'Lisa Anderson',
        department: 'Electrical Engineering',
        gpa: 3.88
    }
];

// API to get all students grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDepartment = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDepartment
    });
});

// API to get individual student GPA by student ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${req.params.studentId} not found`
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});