
const express = require('express');

const app = express();

const employeeRoutes = require('./employees');

const dashboardRoutes = require('./dashboard');

app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.use('/api/dashboard', dashboardRoutes);

const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Employee Management System',
        version: '1.0.0',
        status: 'Running'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
