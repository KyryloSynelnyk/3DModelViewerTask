# 3D Model Viewer

A React-based 3D model viewer that displays models in both wireframe and shaded views side by side. Built with Three.js and React Three Fiber.

## Features

- **Dual Viewport Layout**:
  - Left panel: Wireframe rendering
  - Right panel: Original shaded rendering
- **Drag & Drop Support**:
  - Simply drag and drop 3D model files into the application window
  - Real-time loading and rendering in both viewports
- **Camera Controls**:
  - Rotate: Left-click and drag
  - Pan: Right-click and drag
  - Zoom: Scroll or pinch (on touch devices)
- **Error Handling**:
  - Clear error messages for unsupported or corrupted files
  - Supports multiple 3D model formats

## Supported Formats

- GLTF/GLB (`.glb`, `.gltf`)
- OBJ (`.obj`)
- STL (`.stl`)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Open the application in your browser
2. Drag and drop a supported 3D model file into the window
3. Interact with the model using the controls:
   - Left-click and drag to rotate
   - Right-click and drag to pan
   - Scroll to zoom

## Technologies Used

- React
- Three.js
- React Three Fiber
- React Three Drei
- Vite

## Development

### Project Structure

- `src/` - Source files
  - `components/` - React components
  - `lib/` - Utility functions
  - `App.jsx` - Main application component
  - `main.jsx` - Application entry point
  - `styles.css` - Global styles
