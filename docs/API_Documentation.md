# REST API Contract Specifications

*Maintained by the Software Architect (Member 1)*

This document outlines the Application Programming Interface (API) design that Member 2 (Backend Dev) must strictly implement to ensure the Next.js frontend built by Member 5 runs smoothly.

## 1. Health Ping
- **Endpoint:** `GET /api/health`
- **Description:** Basic system availability ping.
- **Response:** `200 OK`
```json
{
  "status": "MedSynth API is live! Goal 40% reached."
}
```

## 2. Dataset Upload Initialization
- **Endpoint:** `POST /api/dataset/upload`
- **Description:** Validates and registers a new base dataset for training.
- **Headers:** `Authorization: Bearer <token>`
- **Payload:**
```json
{
  "dataset_name": "Covid-19 Chest X-Rays Baseline",
  "data_type": "image",
  "size_mb": 450
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Dataset Covid-19 Chest X-Rays Baseline parsed and saved successfully.",
  "id": 142
}
```

## 3. Start Synthesis Job
- **Endpoint:** `POST /api/jobs/start`
- **Description:** Triggers the ML service (Factory Pattern initialization via child_process).
- **Payload:**
```json
{
  "dataset_id": 142,
  "requested_epochs": 200,
  "synthetic_target_size": 10000
}
```
- **Response:** `202 Accepted`
```json
{
  "job_id": 8982,
  "status": "training_queued"
}
```

## 4. Query Job Result
- **Endpoint:** `GET /api/jobs/:id/status`
- **Description:** Long-poll capability to check training epochs progress and FID scores.
- **Response:** `200 OK`
```json
{
  "job_id": 8982,
  "status": "completed",
  "fid_score": 12.4,
  "download_url": "https://storage.medsynth/jobs/8982/synthetic_data.zip"
}
```