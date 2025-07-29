import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { FilterPanel } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { Charts } from './components/Charts';
import { getTelemetryData } from './utils/storage';
import { applyFilters, getUniqueStatuses } from './utils/filters';
import { UnifiedTelemetryData, FilterState } from './types/telemetry';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [telemetryData, setTelemetryData] = useState<UnifiedTelemetryData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    temperatureMin: '',
    temperatureMax: '',
    durationMin: '',
    durationMax: '',
    dateFrom: '',
    dateTo: '',
  });

  const [activeTab, setActiveTab] = useState<'table' | 'charts'>('table');

  useEffect(() => {
    const data = getTelemetryData();
    setTelemetryData(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleUploadComplete = (newData: UnifiedTelemetryData[]) => {
    const allData = getTelemetryData();
    setTelemetryData(allData);
  };

  const handleDataCleared = () => {
    setTelemetryData([]);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      temperatureMin: '',
      temperatureMax: '',
      durationMin: '',
      durationMax: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const filteredData = applyFilters(telemetryData, filters);
  const availableStatuses = getUniqueStatuses(telemetryData);

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        data={telemetryData}
        onDataCleared={handleDataCleared}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* File Upload Section */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upload Telemetry Data
            </h2>
            <FileUpload 
              onUploadComplete={handleUploadComplete}
              isDarkMode={isDarkMode}
            />
          </section>

          {/* Dashboard Section */}
          {telemetryData.length > 0 && (
            <>
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Filter Data
                </h2>
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableStatuses={availableStatuses}
                  isDarkMode={isDarkMode}
                  onClearFilters={handleClearFilters}
                />
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Data Visualization
                  </h2>
                  
                  <div className={`flex rounded-lg border ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <button
                      onClick={() => setActiveTab('table')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                        activeTab === 'table'
                          ? isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : isDarkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Table View
                    </button>
                    <button
                      onClick={() => setActiveTab('charts')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                        activeTab === 'charts'
                          ? isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : isDarkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Charts View
                    </button>
                  </div>
                </div>

                {filteredData.length > 0 && (
                  <div className={`mb-4 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Showing {filteredData.length} of {telemetryData.length} records
                  </div>
                )}

                {activeTab === 'table' && (
                  <DataTable data={filteredData} isDarkMode={isDarkMode} />
                )}

                {activeTab === 'charts' && (
                  <Charts data={filteredData} isDarkMode={isDarkMode} />
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;