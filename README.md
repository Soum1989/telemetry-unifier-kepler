# Telemetry Unifier Web Application

A modern, production-ready telemetry data unification and visualization platform built for the **Tencent EdgeOne Kepler Plan S3 Competition**.

## 🚀 Live Demo

Deployed this application to Tencent EdgeOne Pages not just for the competition but also for it is a front-end platform for fast, serverless web development and deployment. It enables quick creation of static sites and dynamic applications with global content delivery and seamless edge functions.

Deployment Link: https://telemetry-unifier-kepler.edgeone.app/


## ✨ Features

### Core Functionality
- **Multi-Format File Upload**: Supports two different JSON telemetry formats
- **Data Unification**: Automatically normalizes different data structures into a unified schema
- **Real-time Processing**: Client-side data processing with instant feedback
- **Persistent Storage**: Local storage with data persistence across sessions

### Dashboard & Visualization
- **Interactive Data Table**: Sortable, filterable table with status indicators
- **Advanced Filtering**: 
  - Text search (device ID/location)
  - Status filtering (healthy, overheating, error, etc.)
  - Temperature range filtering
  - Duration range filtering
  - Date range filtering
- **Dynamic Charts**: 
  - Line chart for temperature trends over time
  - Bar chart for status distribution
- **CSV Export**: Download filtered data as CSV files

### User Experience
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with subtle animations
- **Real-time Updates**: Instant visual feedback for all user interactions

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + React Chart.js 2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## 📊 Supported Data Formats

### Format 1 (Timestamp-based)
```json
{
  "deviceID": "tg01-ntpc-korba",
  "deviceType": "TurbineGenerator",
  "location": "india/chhattisgarh/ntpc-korba/power-block-1",
  "timestamp": 1724445837783,
  "startTime": 1724442237783,
  "endTime": 1724445837783,
  "operationStatus": "healthy",
  "temp": 48,
  "vibration": 6.2
}
```

### Format 2 (ISO Date-based)
```json
{
  "device": {
    "id": "tg02-ntpc-korba",
    "type": "TurbineGenerator"
  },
  "startTime": "2024-08-24T08:50:00Z",
  "endTime": "2024-08-24T09:57:17Z",
  "timestamp": "2024-08-24T09:57:17Z",
  "country": "india",
  "state": "chhattisgarh",
  "plant": "ntpc-korba",
  "block": "power-block-2",
  "data": {
    "status": "overheating",
    "temperature": 72,
    "vibration": 7.8
  }
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd telemetry-unifier

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment to Tencent EdgeOne

### Method 1: GitHub Integration (Recommended)
1. Push this repository to GitHub
2. Go to [EdgeOne Pages](https://edgeone.ai/)
3. Connect your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Node Version**: 18+

### Method 2: Manual Upload
1. Run `npm run build` locally
2. Upload the `dist` folder contents to EdgeOne Pages
3. Configure as a static site

## 📁 Project Structure

```
telemetry-unifier/
├── src/
│   ├── components/          # React components
│   │   ├── Charts.tsx       # Chart visualizations
│   │   ├── DataTable.tsx    # Data table component
│   │   ├── FileUpload.tsx   # File upload interface
│   │   ├── FilterPanel.tsx  # Advanced filtering
│   │   └── Header.tsx       # App header with controls
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   ├── dataUnifier.ts   # Data normalization logic
│   │   ├── filters.ts       # Filtering algorithms
│   │   └── storage.ts       # Local storage management
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Production build output
└── package.json             # Project dependencies
```

## 🎯 Competition Features

This application is specifically designed for the **Tencent EdgeOne Kepler Plan S3 Competition** with:

- ✅ **Edge-Optimized**: Static site perfect for EdgeOne Pages
- ✅ **Production Ready**: Professional UI/UX with error handling
- ✅ **Scalable Architecture**: Modular, maintainable codebase
- ✅ **Modern Tech Stack**: Latest React, TypeScript, and Vite
- ✅ **Performance Focused**: Optimized builds and lazy loading
- ✅ **Mobile Responsive**: Works seamlessly across all devices

## 🏆 Key Highlights for Judges

1. **Technical Excellence**: Clean, type-safe code with modern best practices
2. **User Experience**: Intuitive interface with smooth interactions
3. **Data Processing**: Robust unification of disparate data formats
4. **Visualization**: Interactive charts with real-time filtering
5. **Edge Deployment**: Optimized for Tencent EdgeOne platform

## 📝 License

This project is created for the Tencent EdgeOne Kepler Plan S3 Competition.

---

**Built with ❤️ for the Tencent EdgeOne Kepler Plan S3 Competition**
