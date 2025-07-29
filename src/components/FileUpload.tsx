import React, { useRef, useState } from 'react';
import { Upload, FileJson, AlertCircle, CheckCircle } from 'lucide-react';
import { processUploadedFiles } from '../utils/dataUnifier';
import { saveTelemetryData } from '../utils/storage';
import { UnifiedTelemetryData } from '../types/telemetry';

interface FileUploadProps {
  onUploadComplete: (data: UnifiedTelemetryData[]) => void;
  isDarkMode: boolean;
}

export function FileUpload({ onUploadComplete, isDarkMode }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    setUploadStatus('idle');
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select at least one JSON file');
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const unifiedData = await processUploadedFiles(selectedFiles);
      saveTelemetryData(unifiedData);
      onUploadComplete(unifiedData);
      setUploadStatus('success');
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process files');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(file => 
      file.type === 'application/json' || file.name.endsWith('.json')
    );
    setSelectedFiles(files);
    setUploadStatus('idle');
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={`p-6 rounded-lg border-2 border-dashed transition-colors ${
      isDarkMode 
        ? 'border-gray-600 bg-gray-800 hover:border-blue-400' 
        : 'border-gray-300 bg-white hover:border-blue-500'
    }`}>
      <div
        className="text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        
        <h3 className={`text-lg font-medium mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Upload Telemetry Files
        </h3>
        
        <p className={`text-sm mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Drag and drop JSON files here, or click to select files
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".json,application/json"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Select Files
        </button>

        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <div className={`text-sm mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Selected files:
            </div>
            {selectedFiles.map((file, index) => (
              <div key={index} className={`flex items-center justify-center gap-2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FileJson className="h-4 w-4" />
                {file.name}
              </div>
            ))}
            
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`mt-3 px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isUploading ? 'Processing...' : 'Upload & Process'}
            </button>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Files processed successfully!</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}