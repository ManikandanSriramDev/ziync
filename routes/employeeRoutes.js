const express = require('express');
const Employee = require('../models/Employee');
const Report = require('../models/Report');
const { isAuthenticated, isAdmin } = require('./middleware/authMiddleware');

const router = express.Router();

// Get all employees
router.get('/employees', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const employees = await Employee.find().populate('reports');
    res.json(employees);
  } catch (error) {
    console.error(`Error fetching employees: ${error.message}`, error);
    res.status(500).send(error.message);
  }
});

// Add a new employee
router.post('/employees', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const newEmployee = await Employee.create({ name, email, position });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(`Error creating employee: ${error.message}`, error);
    res.status(500).send(error.message);
  }
});

// Add a report to an employee
router.post('/employees/:employeeId/reports', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    const report = await Report.create({ title, content, employee: req.params.employeeId });
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    employee.reports.push(report);
    await employee.save();
    res.status(201).json(report);
  } catch (error) {
    console.error(`Error adding report to employee: ${error.message}`, error);
    res.status(500).send(error.message);
  }
});

module.exports = router;