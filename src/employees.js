const express = require('express');

const router = express.Router();

// Temporary in-memory employee records
let employees = [
    {
        id: 1,
        name: 'John Doe',
        department: 'IT',
        designation: 'System Administrator'
    },
    {
        id: 2,
        name: 'Jane Smith',
        department: 'HR',
        designation: 'HR Manager'
    }
];

// GET all employees
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: employees.length,
        data: employees
    });
});

// GET employee by ID
router.get('/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    }

    res.json({
        success: true,
        data: employee
    });
});

// CREATE a new employee
router.post('/', (req, res) => {
    const { name, department, designation } = req.body;

    if (!name || !department || !designation) {
        return res.status(400).json({
            success: false,
            message: 'Name, department and designation are required'
        });
    }

    const newEmployee = {
        id: employees.length > 0
            ? Math.max(...employees.map(emp => emp.id)) + 1
            : 1,
        name,
        department,
        designation
    };

    employees.push(newEmployee);

    res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: newEmployee
    });
});

// DELETE employee by ID
router.delete('/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);

    if (employeeIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    }

    employees.splice(employeeIndex, 1);

    res.json({
        success: true,
        message: 'Employee deleted successfully'
    });
});

module.exports = router;
