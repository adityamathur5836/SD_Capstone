const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController.js');

// Health Check
router.get('/health', (req, res) => {
    res.json({ status: "healthy", components: [{ id: "db", name: "PostgreSQL", status: "healthy" }] });
});

// Authentication
router.post('/auth/login', (req, res) => {
    res.json({ access_token: "mock_jwt_token_12345", token_type: "Bearer" });
});

// Core Pipeline Routes
router.post('/generate', JobController.generateData);
router.get('/analytics', JobController.getAnalytics);
router.post('/upload', JobController.uploadDataset);
router.get('/train', JobController.streamTraining);

module.exports = router;