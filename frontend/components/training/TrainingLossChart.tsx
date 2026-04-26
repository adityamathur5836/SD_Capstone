"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMedicalStore } from '@/store/useMedicalStore';
import { useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrainingLossChart() {
  const { epochHistory } = useMedicalStore();

  const chartData = useMemo(() => {
    if (epochHistory.length === 0) return null;

    const labels = epochHistory.map(m => `Epoch ${m.epoch}`);
    const gLoss = epochHistory.map(m => m.generator_loss);
    const dLoss = epochHistory.map(m => m.discriminator_loss);
    const accuracy = epochHistory.map(m => m.accuracy);

    return {
      labels,
      datasets: [
        {
          label: 'Generator Loss',
          data: gLoss,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: 'Discriminator Loss',
          data: dLoss,
          borderColor: 'rgb(244, 63, 94)',
          backgroundColor: 'rgba(244, 63, 94, 0.5)',
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: 'Accuracy (FID Sim)',
          data: accuracy,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          tension: 0.1,
          yAxisID: 'y1',
          borderDash: [5, 5],
        },
      ],
    };
  }, [epochHistory]);

  if (!chartData) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="p-4 bg-slate-50 rounded-full">
          <Activity className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Awaiting Training Telemetry</p>
          <p className="text-xs text-slate-500 mt-1">Start the GAN simulator to begin receiving real-time performance metrics.</p>
        </div>
      </div>
    );
  }

  const options: ChartOptions<'line'> = {
    // ... existing options ...
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: '#f8fafc',
        },
        title: {
          display: true,
          text: 'Loss Value',
          font: { size: 10, weight: 'bold' }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Accuracy / Similarity',
          font: { size: 10, weight: 'bold' }
        },
        min: 0,
        max: 1
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 10 },
          maxTicksLimit: 10
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 10, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="h-full w-full min-h-[350px]">
      <Line data={chartData} options={options} />
    </div>
  );
}

import { Activity } from 'lucide-react';
