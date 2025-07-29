import React from 'react';
import { Moon, Sun, Download, Database, Trash2 } from 'lucide-react';
import { exportToCsv, clearTelemetryData } from '../utils/storage';
import { UnifiedTelemetryData } from '../types/telemetry';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  data: UnifiedTelemetryData[];
  onDataCleared: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode, data, onDataCleared }: HeaderProps) {
  const handleExport = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    exportToCsv(data);
  };

  const handleClearData = () => {
    if (data.length === 0) {
      alert('No data to clear');
      return;
    }
    
    if (confirm('Are you sure you want to clear all telemetry data? This action cannot be undone.')) {
      clearTelemetryData();
      onDataCleared();
    }
  };

  return (
    <header className={`border-b ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Database className={`h-8 w-8 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <div>
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Telemetry Unifier
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {data.length} records loaded
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              disabled={data.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>

            <button
              onClick={handleClearData}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'
              }`}
              disabled={data.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Clear Data
            </button>

            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}