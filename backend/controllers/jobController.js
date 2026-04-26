// OOP: Encapsulation — All API business logic isolated in a single class
const { spawn } = require('child_process');
const path = require('path');

class JobController {

    // POST /generate — Returns SyntheticSample[] to the frontend
    static async generateData(req, res) {
        const count = parseInt(req.query.count) || 1;
        console.log(`[JobController] Generating ${count} synthetic samples`);

        const genders = ['Male', 'Female', 'Other'];
        const ethnicities = ['Asian', 'Caucasian', 'African', 'Hispanic'];
        const conditions = ['Diabetic Retinopathy', 'Glaucoma', 'Age-Related Macular Degeneration'];
        const drLevels = ['None', 'Mild', 'Moderate', 'Severe'];

        const samples = [];
        for (let i = 0; i < count; i++) {
            samples.push({
                id: `syn_${Math.random().toString(36).substring(2, 9)}`,
                timestamp: new Date().toISOString(),
                modality: "Retinal Scan",
                image_url: `/placeholder_${i}.png`,
                confidence_score: parseFloat((0.85 + Math.random() * 0.14).toFixed(3)),
                is_synthetic: true,
                demographics: {
                    age: 20 + Math.floor(Math.random() * 60),
                    gender: genders[Math.floor(Math.random() * genders.length)],
                    ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)]
                },
                medical_metadata: {
                    condition: conditions[Math.floor(Math.random() * conditions.length)],
                    dr_level: drLevels[Math.floor(Math.random() * drLevels.length)],
                    image_quality_score: parseFloat((0.7 + Math.random() * 0.3).toFixed(3)),
                    privacy_score: parseFloat((0.9 + Math.random() * 0.1).toFixed(3)),
                    flagged: Math.random() < 0.05
                }
            });
        }

        setTimeout(() => res.json(samples), 1500);
    }

    // GET /analytics — Returns AnalyticsMetrics
    static async getAnalytics(req, res) {
        res.json({
            total_samples_generated: 15420,
            active_models: 3,
            compute_usage_hours: 42.5,
            accuracy_metrics: { fid_score: 12.4, inception_score: 8.7 },
            privacy_metrics: { average_privacy_score: 0.984, reidentification_risk_score: 0.012 },
            bias_metrics: {
                gender_distribution: { Male: 0.48, Female: 0.49, Other: 0.03 },
                ethnicity_distribution: { Asian: 0.25, Caucasian: 0.30, African: 0.25, Hispanic: 0.20 },
                age_group_distribution: { "18-30": 0.2, "31-50": 0.4, "51-70": 0.3, "71+": 0.1 },
                condition_prevalence: { "Diabetic Retinopathy": 0.35, "Glaucoma": 0.25, "Normal": 0.40 }
            },
            fidelity_metrics: {
                real_vs_synthetic_similarity: 0.94,
                feature_correlation_matrix: { texture: 0.91, color: 0.88, shape: 0.95 }
            }
        });
    }

    // POST /upload
    static async uploadDataset(req, res) {
        res.json({ task_id: `task_${Date.now()}`, status: "completed", message: "Dataset uploaded." });
    }

    // GET /train — SSE stream returning TrainingMetrics
    static async streamTraining(req, res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');

        let epoch = 0;
        const maxEpochs = 320;

        const intervalId = setInterval(() => {
            epoch += 1;
            const metrics = {
                epoch,
                loss: parseFloat((1.8 * Math.exp(-0.01 * epoch) + 0.05 * Math.random()).toFixed(4)),
                accuracy: parseFloat(Math.min(0.99, 0.3 + (epoch / maxEpochs) * 0.65 + 0.02 * Math.random()).toFixed(4)),
                generator_loss: parseFloat((1.5 * Math.exp(-0.008 * epoch) + 0.03 * Math.random()).toFixed(4)),
                discriminator_loss: parseFloat((1.2 * Math.exp(-0.005 * epoch) + 0.02 * Math.random()).toFixed(4)),
            };
            res.write(`data:${JSON.stringify(metrics)}\n\n`);
            if (epoch >= maxEpochs) { clearInterval(intervalId); res.end(); }
        }, 500);

        req.on('close', () => clearInterval(intervalId));
    }
}

module.exports = JobController;