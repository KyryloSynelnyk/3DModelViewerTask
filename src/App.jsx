import { useCallback, useMemo, useState } from 'react'
import Viewport from './components/Viewport.jsx'
import { loadModelFromFile } from './lib/loadModelFromFile.js'

const supported = ['.glb', '.gltf', '.obj', '.stl']

export default function App() {
  const [model, setModel] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [bgColor, setBgColor] = useState('#0b1020')
  const [wireframeBgColor, setWireframeBgColor] = useState('#070a12')

  const hint = useMemo(() => {
    return `Drag & drop a 3D model file (${supported.join(', ')}) into this window.`
  }, [])

  const handleFile = useCallback(async (file) => {
    setError('')
    setIsLoading(true)

    try {
      const loaded = await loadModelFromFile(file)
      setModel(loaded)
    } catch (e) {
      setModel(null)
      setError(e instanceof Error ? e.message : 'Failed to load model.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const onDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }, [])

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer?.files?.[0]
      if (!file) return

      handleFile(file)
    },
    [handleFile],
  )

  return (
    <div
      className="app"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="topbar">
        <div className="instructions">
          <div>{hint}</div>
          {error ? <div className="error">{error}</div> : null}
        </div>
        <div className="badge">
          {isLoading ? (
            <span className="loading">
              <span>Loading…</span>
            </span>
          ) : model ? (
            <div className="status-container">
              <span>Model loaded • </span>
              <div className="color-options">
                <span className="color-label">Wireframe:</span>
                {['#070a12', '#0f172a', '#1e293b'].map((color) => (
                  <button
                    key={`wireframe-${color}`}
                    className={`color-swatch ${wireframeBgColor === color ? 'active' : ''}`}
                    style={{ '--color': color }}
                    onClick={() => setWireframeBgColor(color)}
                    title={`Set wireframe background to ${color}`}
                  />
                ))}
                <span className="color-separator">|</span>
                <span className="color-label">Shaded:</span>
                {['#0b1020', '#1a1a2e', '#16213e'].map((color) => (
                  <button
                    key={`shaded-${color}`}
                    className={`color-swatch ${bgColor === color ? 'active' : ''}`}
                    style={{ '--color': color }}
                    onClick={() => setBgColor(color)}
                    title={`Set shaded background to ${color}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            'No model'
          )}
        </div>
      </div>

      <div className="main">
        <div className="viewport">
          <Viewport model={model} mode="wireframe" bgColor={wireframeBgColor} />
        </div>
        <div className="viewport">
          <Viewport model={model} mode="shaded" bgColor={bgColor} />
        </div>

        {isDragging || !model ? (
          <div className="dropOverlay">
            <div className="dropOverlayInner">
              {isDragging ? 'Drop the file to load it.' : hint}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
