import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { AlertCircle } from 'lucide-react'
import './ThreeDViewer.css'

interface ModelProps {
  url: string
  autoRotate?: boolean
  autoRotateSpeed?: number
}

function Model({ url, autoRotate = true, autoRotateSpeed = 0.5 }: ModelProps) {
  const group = useRef<Group>(null)
  const resolvedUrl = url.startsWith('/') ? `${import.meta.env.BASE_URL}${url.slice(1)}` : url
  const { scene } = useGLTF(resolvedUrl)
  
  useFrame((state) => {
    if (group.current && autoRotate) {
      group.current.rotation.y = state.clock.elapsedTime * autoRotateSpeed * 0.3
    }
  })

  useEffect(() => {
    if (group.current) {
      // Center and scale the model
      group.current.traverse((child) => {
        if ((child as Mesh).isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return <primitive ref={group} object={scene} scale={1.5} />
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#C9A45C" wireframe />
    </mesh>
  )
}

function ErrorFallback({ onReset }: { onReset: () => void }) {
  return (
    <div className="threed-error">
      <AlertCircle size={48} />
      <p>Unable to load 3D model</p>
      <button onClick={onReset} className="btn btn-ghost btn-sm">Try Again</button>
    </div>
  )
}

interface ThreeDViewerProps {
  modelPath?: string
  className?: string
  autoRotate?: boolean
}

const ThreeDViewer = ({ modelPath, className = '', autoRotate = true }: ThreeDViewerProps) => {
  const [hasError, setHasError] = useState(false)
  const [key, setKey] = useState(0)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch {
      setWebglSupported(false)
    }
  }, [])

  const handleReset = () => {
    setHasError(false)
    setKey(prev => prev + 1)
  }

  if (!modelPath) {
    return (
      <div className={`threed-viewer ${className}`}>
        <div className="threed-placeholder">
          <p>3D model not available</p>
        </div>
      </div>
    )
  }

  if (!webglSupported) {
    return (
      <div className={`threed-viewer ${className}`}>
        <div className="threed-placeholder">
          <p>WebGL not supported</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`threed-viewer ${className}`}>
        <ErrorFallback onReset={handleReset} />
      </div>
    )
  }

  return (
    <div className={`threed-viewer ${className}`}>
      <Canvas
        key={key}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
        <directionalLight position={[-10, 5, -10]} intensity={0.6} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
        <Suspense fallback={<Loader />}>
          <Model url={modelPath} autoRotate={autoRotate} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={6}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="threed-controls">
        <span className="threed-hint">Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  )
}

export default ThreeDViewer
