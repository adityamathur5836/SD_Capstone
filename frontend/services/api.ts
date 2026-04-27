import axios from 'axios';
import {
    PatientData,
    SyntheticSample,
    AnalyticsMetrics,
    UploadResponse,
    Dataset
} from '../types/medical';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Initialize token from localStorage if it exists (for session restoration)
let authToken: string | null = null;
if (typeof window !== 'undefined') {
    const persisted = localStorage.getItem('medical-storage');
    if (persisted) {
        try {
            const { state } = JSON.parse(persisted);
            authToken = state.token || null;
            if (authToken) {
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            }
        } catch (e) {
            console.error('Failed to restore auth token:', e);
        }
    }
}

// Auth Interceptors
apiClient.interceptors.request.use((config) => {
    if (authToken && config.headers) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authToken = null; // Clear local stale token
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth-unauthorized'));
            }
        }
        return Promise.reject(error);
    }
);

export const medicalApi = {
    // Authentication
    login: async (username: string, password: string): Promise<{ access_token: string; token_type: string }> => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        const response = await apiClient.post('/auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    },

    setAuthToken: (token: string | null) => {
        authToken = token;
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete apiClient.defaults.headers.common['Authorization'];
        }
    },

    // Core Endpoints
    generateData: async (patientData: PatientData, count: number = 1): Promise<SyntheticSample[]> => {
        const response = await apiClient.post(`/generate?count=${count}`, patientData);
        return response.data;
    },

    getAnalytics: async (): Promise<AnalyticsMetrics> => {
        const response = await apiClient.get('/analytics');
        return response.data;
    },

    uploadDataset: async (files: File[]): Promise<UploadResponse> => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        const response = await apiClient.post('/upload', formData);
        return response.data;
    },

    // For streaming training data, we use standard EventSource
    getTrainingStreamUrl: () => `${API_BASE_URL}/train`,

    getHealth: async () => {
        const response = await apiClient.get('/health', { baseURL: API_BASE_URL });
        return response.data;
    }
};
