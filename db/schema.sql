-- 1. USER Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Dataset Table
CREATE TABLE datasets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    format VARCHAR(50) NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Training Job Table
CREATE TABLE training_jobs (
    id SERIAL PRIMARY KEY,
    dataset_id INT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    epochs INT DEFAULT 100,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Trained Model Table
CREATE TABLE trained_models (
    id SERIAL PRIMARY KEY,
    training_job_id INT NOT NULL REFERENCES training_jobs(id) ON DELETE CASCADE,
    weights_path TEXT NOT NULL,
    metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Synthetic Report Table
CREATE TABLE synthetic_reports (
    id SERIAL PRIMARY KEY,
    training_model_id INT NOT NULL REFERENCES trained_models(id) ON DELETE CASCADE,
    size INT NOT NULL,
    gen_params JSONB,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Analysis Report Table
CREATE TABLE analysis_reports (
    id SERIAL PRIMARY KEY,
    cohort_id INT NOT NULL REFERENCES synthetic_reports(id) ON DELETE CASCADE,
    quality_score DECIMAL(5,2),
    bias_score DECIMAL(5,2),
    reid_risk DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);