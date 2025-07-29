import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { UnifiedTelemetryData } from '../types/telemetry';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface ChartsProps {
  data: UnifiedTelemetryData[];
  isDarkMode: boolean;
}

export function Charts({ data, isDarkMode }: ChartsProps) {
  const textColor = isDarkMode ? '#E5E7EB' : '#374151';
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';

  // Temperature over time (Line Chart)
  const temperatureData = {
    labels: data
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .map(item => format(item.timestamp, 'MMM dd HH:mm')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map(item => item.temperature),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Status distribution (Bar Chart)
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Count',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#06B6D4', // cyan
          '#F97316', // orange
        ],
        borderWidth: 1,
        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          maxRotation: 45,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  if (data.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <p className="text-lg">No data available for charts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature Line Chart */}
      <div className={`p-6 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Temperature Over Time
        </h3>
        <div className="h-80">
          <Line data={temperatureData} options={chartOptions} />
        </div>
      </div>

      {/* Status Bar Chart */}
      <div className={`p-6 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Status Distribution
        </h3>
        <div className="h-80">
          <Bar data={statusData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}