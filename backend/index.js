// OOP: Singleton Pattern — Server lifecycle wrapped in a class
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

class MedSynthServer {
    constructor(port = 5000) {
        this.port = port;
        this.app = express();
        this._configureMiddleware();
        this._mountRoutes();
        this._configureErrorHandling();
    }

    _configureMiddleware() {
        // origin: true allows the middleware to dynamically set Access-Control-Allow-Origin
        // to the request's origin, which is required when credentials: true is used.
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
    }

    _mountRoutes() {
        this.app.use('/api/v1', apiRoutes);
    }

    _configureErrorHandling() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'MedSynth Internal Server Error' });
        });
    }

    start() {
        const PORT = process.env.PORT || 5001;
        this.app.listen(PORT, () => {
            console.log(`[Backend] MedSynth Server listening on port ${PORT}`);
            console.log(`[Backend] API Contract Initialized.`);
        });
    }
}

// Single entry point
const PORT = process.env.PORT || 5000;
const server = new MedSynthServer(PORT);
server.start();