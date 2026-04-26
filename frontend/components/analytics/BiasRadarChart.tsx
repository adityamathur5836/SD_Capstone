"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface BiasRadarChartProps {
  labels: string[];
  currentData: number[];
  targetData: number[];
}

export default function BiasRadarChart({ labels, currentData, targetData }: BiasRadarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Current Distribution',
        data: currentData,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Fairness Target (Real)',
        data: targetData,
        backgroundColor: 'rgba(203, 213, 225, 0.2)',
        borderColor: 'rgb(148, 163, 184)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgb(148, 163, 184)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(148, 163, 184)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#f1f5f9'
        },
        suggestedMin: 0,
        suggestedMax: 1,
        ticks: {
          display: false,
          stepSize: 0.2
        },
        pointLabels: {
          font: {
            size: 10,
            weight: 'bold',
            family: 'Inter'
          },
          color: '#64748b'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 10,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="h-full min-h-[300px] w-full">
      <Radar data={data} options={options} />
    </div>
  );
}
