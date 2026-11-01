const express = require('express');

const router = express.Router();

// Import employee data
const employeeRoutes = require('./employees');

// GET dashboard summary
router.get('/', (req, res) => {

    const employees = employeeRoutes.getEmployees();

    // Calculate total employees
    const totalEmployees = employees.length;

    // Calculate employee count by department
    const departmentSummary = employees.reduce((summary, employee) => {

        summary[employee.department] =
            (summary[employee.department] || 0) + 1;

        return summary;

    }, {});

    res.json({
        success: true,
        dashboard: {
            application: 'Employee Management System',
            status: 'Running',
            totalEmployees: totalEmployees,
            departmentSummary: departmentSummary,
            generatedAt: new Date().toISOString()
        }
    });

});

module.exports = router;
