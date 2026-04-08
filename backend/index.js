const express = require('express');

const { Dataset } = require('./models/Dataset');
const { ResearcherUser, AdminUser } = require('./models/User');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: "MedSynth API is active! Node.js backend running successfully." 
    });
});

app.get('/api/auth/mock-login', (req, res) => {
    const userRole = req.query.role || "researcher";
    let activeUser;

    if (userRole === "admin") {
        activeUser = new AdminUser(99, "Dr. Admin", "admin@medsynth.org");
    } else {
        activeUser = new ResearcherUser(101, "Dr. Alice", "alice@medsynth.org");
    }

    res.json({
        user: activeUser.getDashboardDetails(),
        permissions: activeUser.getPermissions()
    });
});

app.post('/api/dataset/upload', (req, res) => {
    const { dataset_name, data_type } = req.body;
    
    if (!dataset_name || !data_type) {
        return res.status(400).json({ error: "Missing dataset_name or data_type string." });
    }

    try {
        const newDataset = new Dataset(Math.floor(Math.random() * 1000), dataset_name, data_type, 101);
        const result = newDataset.save();
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/jobs/start', (req, res) => {
    const { dataset_id, requested_epochs } = req.body;
    
    if (!dataset_id) {
        return res.status(400).json({ error: "Requires dataset_id" });
    }

    res.status(202).json({
        job_id: Math.floor(Math.random() * 8000) + 1000,
        status: "training_queued",
        epochs_target: requested_epochs || 100
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[Backend] MedSynth Server listening on port ${PORT}`);
    console.log(`[Backend] API Contract Initialized.`);
});