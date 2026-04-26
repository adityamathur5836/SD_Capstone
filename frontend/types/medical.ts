export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other",
}

export enum Ethnicity {
    ASIAN = "Asian",
    CAUCASIAN = "Caucasian",
    AFRICAN = "African",
    HISPANIC = "Hispanic",
    OTHER = "Other",
}

export enum DrLevel {
    NONE = "None",
    MILD = "Mild",
    MODERATE = "Moderate",
    SEVERE = "Severe",
    PROLIFERATIVE = "Proliferative",
}

export enum ProcessingStatus {
    UPLOADING = "uploading",
    PROCESSING = "processing",
    COMPLETED = "completed",
    ERROR = "error",
}

export interface Demographics {
    age: number;
    gender: Gender;
    ethnicity: Ethnicity;
}

export interface MedicalMetadata {
    condition: string;
    dr_level?: DrLevel;
    image_quality_score: number;
    privacy_score: number;
    flagged?: boolean;
    rating?: number;
}

export interface PatientData {
    age: number;
    condition: string;
    scan_type: string;
    metadata?: Record<string, any>;
}

export interface SyntheticSample {
    id: string;
    timestamp: string;
    modality: string;
    image_url: string;
    confidence_score: number;
    is_synthetic: boolean;
    demographics?: Demographics;
    medical_metadata?: MedicalMetadata;
}

export interface PrivacyMetrics {
    average_privacy_score: number;
    reidentification_risk_score: number;
}

export interface BiasMetrics {
    gender_distribution: Record<string, number>;
    ethnicity_distribution: Record<string, number>;
    age_group_distribution: Record<string, number>;
    condition_prevalence: Record<string, number>;
}

export interface FidelityMetrics {
    real_vs_synthetic_similarity: number;
    feature_correlation_matrix: Record<string, number>;
}

export interface AnalyticsMetrics {
    total_samples_generated: number;
    active_models: number;
    compute_usage_hours: number;
    accuracy_metrics: Record<string, any>;
    privacy_metrics?: PrivacyMetrics;
    bias_metrics?: BiasMetrics;
    fidelity_metrics?: FidelityMetrics;
}

export interface TrainingMetrics {
    epoch: number;
    loss: number;
    accuracy: number;
    discriminator_loss: number;
    generator_loss: number;
}

export interface Dataset {
    id: string;
    name: string;
    type: string;
    file_count: number;
    total_size_bytes: number;
    upload_date: string;
    status: ProcessingStatus;
    processed_count: number;
}

export interface UploadResponse {
    task_id: string;
    status: string;
    message: string;
}
