import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    SyntheticSample,
    AnalyticsMetrics,
    TrainingMetrics,
    Dataset
} from '@/types/medical';
import { medicalApi } from '@/services/api';

interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    details: string;
}

interface PipelineConfig {
    diseasePrevalence: number;
    mildSeverity: number;
    moderateSeverity: number;
    severeSeverity: number;
    ageMin: number;
    ageMax: number;
    noiseLevel: number;
    batchSize: number;
}

interface ResourceUsage {
    gpuMemory: number;
    gpuLoad: number;
    cpuLoad: number;
    diskSpace: number;
}

interface BiasMetrics {
    radarData: {
        labels: string[];
        current: number[];
        target: number[];
    };
    suggestions: MitigationSuggestion[];
}

interface MitigationSuggestion {
    id: string;
    text: string;
    impact: string;
    confidence: number;
}

interface GalleryFilters {
    condition?: string;
    minConfidence: number;
    severity?: string;
    gender?: string;
    flaggedOnly: boolean;
}

interface TrainingRun {
    id: string;
    startTime: string;
    endTime?: string;
    parameters: PipelineConfig;
    finalMetrics?: TrainingMetrics;
    status: 'running' | 'completed' | 'failed' | 'stopped';
}

interface ResourceSnapshot {
    timestamp: string;
    usage: ResourceUsage;
}

interface Checkpoint {
    id: string;
    runId: string;
    timestamp: string;
    epoch: number;
    metrics: TrainingMetrics;
    fid: number;
    isBest: boolean;
    path: string;
}

export type ExportFormat = 'DICOM' | 'NIfTI' | 'PNG' | 'CSV' | 'JSON' | 'PARQUET';

interface ExportTask {
    id: string;
    format: ExportFormat;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    downloadUrl?: string;
    timestamp: string;
    fileCount: number;
}

interface DatasetVersion {
    id: string;
    version: string;
    timestamp: string;
    samplesCount: number;
    fidelityScore: number;
    biasScore: number;
    changelog: string;
    author: string;
}

interface APIKey {
    id: string;
    name: string;
    key: string;
    created: string;
    lastUsed?: string;
    status: 'active' | 'revoked';
}

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'maintenance';

interface SystemComponentStatus {
    id: string;
    name: string;
    status: HealthStatus;
    latency?: number;
    lastChecked: string;
    message?: string;
}

interface SystemHealthStatus {
    overall: HealthStatus;
    components: SystemComponentStatus[];
}

interface SystemAlert {
    id: string;
    priority: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    isAcknowledged: boolean;
    componentId?: string;
}

interface MedicalState {
    samples: SyntheticSample[];
    analytics: AnalyticsMetrics | null;
    trainingProgress: TrainingMetrics | null;
    activeDataset: Dataset | null;
    isGenerating: boolean;
    isTraining: boolean;

    // Pipeline State
    currentStep: number;
    auditLogs: AuditLog[];
    pipelineConfig: PipelineConfig;
    resourceUsage: ResourceUsage;

    // Gallery State
    galleryFilters: GalleryFilters;

    // Analytics & Bias State
    biasMetrics: BiasMetrics | null;

    // Training Monitoring State
    trainingHistory: TrainingRun[];
    epochHistory: TrainingMetrics[];
    resourceHistory: ResourceSnapshot[];
    checkpoints: Checkpoint[];
    trainingLogs: string[];

    // Export & Integration State
    datasetVersions: DatasetVersion[];
    apiKeys: APIKey[];
    exportQueue: ExportTask[];

    // System Health State
    systemHealth: SystemHealthStatus;
    activeAlerts: SystemAlert[];
    uptimeHistory: { timestamp: string; score: number }[];

    startGeneration: (count?: number) => Promise<void>;
    setSamples: (samples: SyntheticSample[]) => void;
    updateSample: (id: string, updates: Partial<SyntheticSample>) => void;
    addSamples: (samples: SyntheticSample[]) => void;
    setAnalytics: (analytics: AnalyticsMetrics) => void;
    setTrainingProgress: (progress: TrainingMetrics) => void;
    setGenerating: (isGenerating: boolean) => void;
    setTraining: (isTraining: boolean) => void;
    setActiveDataset: (dataset: Dataset | null) => void;
    setCurrentStep: (step: number) => void;
    addAuditLog: (action: string, details: string) => void;
    setPipelineConfig: (config: Partial<PipelineConfig>) => void;
    setResourceUsage: (usage: Partial<ResourceUsage>) => void;
    setGalleryFilters: (filters: Partial<GalleryFilters>) => void;
    setBiasMetrics: (metrics: BiasMetrics) => void;
    applyMitigation: (suggestionId: string) => void;
    addTrainingLog: (log: string) => void;
    addResourceSnapshot: (usage: ResourceUsage) => void;
    addCheckpoint: (checkpoint: Checkpoint) => void;
    addTrainingMetrics: (metrics: TrainingMetrics) => void;

    // Export Actions
    addExportTask: (task: ExportTask) => void;
    updateExportTask: (id: string, updates: Partial<ExportTask>) => void;
    addDatasetVersion: (version: DatasetVersion) => void;
    addAPIKey: (key: APIKey) => void;
    revokeAPIKey: (id: string) => void;

    // Health Actions
    setComponentStatus: (componentId: string, status: HealthStatus, latency?: number) => void;
    addSystemAlert: (alert: Omit<SystemAlert, 'id' | 'isAcknowledged' | 'timestamp'>) => void;
    acknowledgeAlert: (alertId: string) => void;

    // Documentation State
    isHelpTrayOpen: boolean;
    setHelpTrayOpen: (isOpen: boolean) => void;
    tutorialStep: number | null;
    setTutorialStep: (step: number | null) => void;

    resetPipeline: () => void;

    // Auth State
    token: string | null;
    user: {
        username: string;
        role: string;
    } | null;
    isAuthModalOpen: boolean;
    setAuth: (token: string, user: { username: string; role: string }) => void;
    setAuthModalOpen: (isOpen: boolean) => void;
    logout: () => void;
}

const defaultPipelineConfig: PipelineConfig = {
    diseasePrevalence: 0.1,
    mildSeverity: 0.4,
    moderateSeverity: 0.3,
    severeSeverity: 0.3,
    ageMin: 18,
    ageMax: 65,
    noiseLevel: 0.05,
    batchSize: 32,
};

const defaultResourceUsage: ResourceUsage = {
    gpuMemory: 0,
    gpuLoad: 0,
    cpuLoad: 0,
    diskSpace: 0,
};

const defaultGalleryFilters: GalleryFilters = {
    minConfidence: 0.7,
    flaggedOnly: false,
};

export const useMedicalStore = create<MedicalState>()(
    persist(
        (set) => ({
            samples: [],
            analytics: null,
            trainingProgress: null,
            activeDataset: null,
            isGenerating: false,
            isTraining: false,
            currentStep: 1,
            auditLogs: [],
            pipelineConfig: defaultPipelineConfig,
            resourceUsage: defaultResourceUsage,
            galleryFilters: defaultGalleryFilters,
            biasMetrics: null,
            trainingHistory: [],
            epochHistory: [],
            resourceHistory: [],
            checkpoints: [],
            trainingLogs: [],
            datasetVersions: [],
            apiKeys: [],
            exportQueue: [],
            systemHealth: {
                overall: 'healthy',
                components: []
            },
            activeAlerts: [],
            uptimeHistory: [],
            isHelpTrayOpen: false,
            tutorialStep: null,

            // Auth Initial State
            token: null,
            user: null,
            isAuthModalOpen: false,

            setAuth: (token, user) => {
                medicalApi.setAuthToken(token);
                set({ token, user, isAuthModalOpen: false });
            },
            setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
            logout: () => {
                medicalApi.setAuthToken(null);
                set({ token: null, user: null, isAuthModalOpen: true });
            },

            startGeneration: async (count?: number) => {
                const { pipelineConfig, addSamples, addAuditLog, token } = useMedicalStore.getState();

                // Clear old samples to avoid stale "?? years" data
                set({ samples: [], isGenerating: true });

                // Explicitly sync token just in case
                if (token) medicalApi.setAuthToken(token);

                addAuditLog("Data Synthesis Started", `Initiated generation of ${count || pipelineConfig.batchSize} samples.`);

                try {
                    const newSamples = await medicalApi.generateData(
                        { condition: "Medical Scan", age: 0, scan_type: "Retinal" }, // Placeholder patient data
                        count || pipelineConfig.batchSize
                    );
                    addSamples(newSamples);
                    addAuditLog("Data Synthesis Completed", `Successfully generated ${newSamples.length} samples.`);
                } catch (error) {
                    console.error("Generation failed:", error);
                    addAuditLog("Data Synthesis Failed", "An error occurred during image generation.");
                } finally {
                    set({ isGenerating: false });
                }
            },

            setSamples: (samples: SyntheticSample[]) => set({ samples }),
            updateSample: (id: string, updates: Partial<SyntheticSample>) => set((state: MedicalState) => ({
                samples: state.samples.map(s => s.id === id ? { ...s, ...updates } : s)
            })),
            addSamples: (newSamples: SyntheticSample[]) => set((state: MedicalState) => ({
                samples: [...state.samples, ...newSamples]
            })),
            setAnalytics: (analytics: AnalyticsMetrics) => set({ analytics }),
            setTrainingProgress: (progress: TrainingMetrics) => set({ trainingProgress: progress }),
            setGenerating: (isGenerating: boolean) => set({ isGenerating }),
            setTraining: (isTraining: boolean) => set({ isTraining }),
            setActiveDataset: (dataset: Dataset | null) => set({ activeDataset: dataset }),
            setCurrentStep: (step: number) => set({ currentStep: step }),
            addAuditLog: (action: string, details: string) => set((state: MedicalState) => ({
                auditLogs: [
                    {
                        id: Math.random().toString(36).substring(2, 9),
                        timestamp: new Date().toISOString(),
                        user: "Researcher Alpha",
                        action,
                        details
                    },
                    ...state.auditLogs
                ]
            })),
            setPipelineConfig: (config: Partial<PipelineConfig>) => set((state: MedicalState) => ({
                pipelineConfig: { ...state.pipelineConfig, ...config }
            })),
            setResourceUsage: (usage: Partial<ResourceUsage>) => set((state: MedicalState) => ({
                resourceUsage: { ...state.resourceUsage, ...usage }
            })),
            setGalleryFilters: (filters: Partial<GalleryFilters>) => set((state) => ({
                galleryFilters: { ...state.galleryFilters, ...filters }
            })),
            setBiasMetrics: (metrics: BiasMetrics) => set({ biasMetrics: metrics }),
            applyMitigation: (suggestionId: string) => {
                set((state) => ({
                    auditLogs: [
                        {
                            id: Math.random().toString(36).substring(2, 9),
                            timestamp: new Date().toISOString(),
                            user: "Researcher Alpha",
                            action: "Bias Mitigation Applied",
                            details: `Suggestion applied: ${suggestionId} `
                        },
                        ...state.auditLogs
                    ]
                }));
            },
            addTrainingLog: (log: string) => set((state) => ({
                trainingLogs: [...state.trainingLogs, log].slice(-500) // Keep last 500 logs
            })),
            addResourceSnapshot: (usage: ResourceUsage) => set((state) => ({
                resourceHistory: [...state.resourceHistory, {
                    timestamp: new Date().toISOString(),
                    usage
                }].slice(-100) // Keep last 100 snapshots
            })),
            addCheckpoint: (checkpoint: Checkpoint) => set((state) => ({
                checkpoints: [checkpoint, ...state.checkpoints]
            })),
            addTrainingMetrics: (metrics: TrainingMetrics) => set((state) => ({
                epochHistory: [...state.epochHistory, metrics],
                trainingProgress: metrics
            })),
            addExportTask: (task: ExportTask) => set((state) => ({
                exportQueue: [task, ...state.exportQueue]
            })),
            updateExportTask: (id: string, updates: Partial<ExportTask>) => set((state) => ({
                exportQueue: state.exportQueue.map(t => t.id === id ? { ...t, ...updates } : t)
            })),
            addDatasetVersion: (version: DatasetVersion) => set((state) => ({
                datasetVersions: [version, ...state.datasetVersions]
            })),
            addAPIKey: (apiKey: APIKey) => set((state) => ({
                apiKeys: [apiKey, ...state.apiKeys]
            })),
            revokeAPIKey: (id: string) => set((state) => ({
                apiKeys: state.apiKeys.map(k => k.id === id ? { ...k, status: 'revoked' } : k)
            })),
            setComponentStatus: (componentId, status, latency) => set((state) => ({
                systemHealth: {
                    ...state.systemHealth,
                    components: state.systemHealth.components.map(c =>
                        c.id === componentId ? { ...c, status, latency, lastChecked: new Date().toISOString() } : c
                    )
                }
            })),
            addSystemAlert: (alert) => set((state) => ({
                activeAlerts: [
                    {
                        ...alert,
                        id: Math.random().toString(36).substring(2, 9),
                        timestamp: new Date().toISOString(),
                        isAcknowledged: false
                    },
                    ...state.activeAlerts
                ]
            })),
            acknowledgeAlert: (alertId) => set((state) => ({
                activeAlerts: state.activeAlerts.map(a => a.id === alertId ? { ...a, isAcknowledged: true } : a)
            })),
            setHelpTrayOpen: (isHelpTrayOpen) => set({ isHelpTrayOpen }),
            setTutorialStep: (tutorialStep) => set({ tutorialStep }),
            resetPipeline: () => set({
                trainingProgress: null,
                isTraining: false,
                isGenerating: false,
                pipelineConfig: defaultPipelineConfig,
                resourceUsage: defaultResourceUsage,
                samples: [],
                galleryFilters: defaultGalleryFilters,
                biasMetrics: null,
                trainingLogs: [],
                epochHistory: [],
                resourceHistory: [],
                checkpoints: [],
                exportQueue: [],
                datasetVersions: [],
                apiKeys: [],
                activeAlerts: [],
                isHelpTrayOpen: false,
                tutorialStep: null
            })
        }),
        {
            name: 'medical-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state?.token) {
                    medicalApi.setAuthToken(state.token);
                }
            },
            partialize: (state: MedicalState) => ({
                pipelineConfig: state.pipelineConfig,
                auditLogs: state.auditLogs,
                currentStep: state.currentStep,
                galleryFilters: state.galleryFilters,
                token: state.token,
                user: state.user
            }),
        }
    )
);
