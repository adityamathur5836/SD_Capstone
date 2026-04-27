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
        this.app.use(cors({ origin: '*', credentials: true }));
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
        this.app.listen(this.port, () => {
            console.log(`[MedSynth Backend] Running on port ${this.port}`);
            console.log(`[MedSynth Routing] MVC Architecture loaded.`);
        });
    }
}

// Single entry point
const PORT = process.env.PORT || 5000;
const server = new MedSynthServer(PORT);
server.start();