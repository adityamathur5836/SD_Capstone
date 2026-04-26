"use client";

import { useEffect, useRef } from 'react';
import { useMedicalStore } from '@/store/useMedicalStore';
import { medicalApi } from '@/services/api';

export function useRealTimeMetrics() {
    const { addTrainingMetrics, setTraining, addAuditLog, isTraining } = useMedicalStore();
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!isTraining) {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            return;
        }

        const url = medicalApi.getTrainingStreamUrl();
        console.log(`Connecting to training stream: ${url}`);

        const es = new EventSource(url);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.status === 'completed') {
                    setTraining(false);
                    addAuditLog("GAN Training Completed", "Model reached target fidelity and passed privacy checks.");
                    es.close();
                    return;
                }

                if (data.metrics) {
                    addTrainingMetrics(data.metrics);
                }
            } catch (err) {
                console.error("Failed to parse SSE data:", err);
            }
        };

        es.onerror = (err) => {
            console.error("SSE Connection Error:", err);
            setTraining(false);
            es.close();
        };

        return () => {
            es.close();
        };
    }, [isTraining, addTrainingMetrics, setTraining, addAuditLog]);

    return { isConnected: !!eventSourceRef.current };
}
