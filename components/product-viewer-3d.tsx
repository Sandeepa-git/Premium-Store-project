"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Html, RoundedBox } from "@react-three/drei"
import { Suspense, useEffect } from "react"
import { PerspectiveCamera as ThreePerspectiveCamera } from "three"

function ModernPhoneModel() {
  return (
    <group scale={1.5} position={[0, 0, 0]}>
      {/* Phone Body */}
      <RoundedBox args={[0.9, 1.95, 0.12]} radius={0.05} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.15} />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox args={[0.85, 1.9, 0.01]} radius={0.03} smoothness={4} position={[0, 0, 0.065]}>
        <meshStandardMaterial color="#0d1b2a" emissive="#1a3a52" emissiveIntensity={0.25} metalness={0.2} roughness={0.1} />
      </RoundedBox>

      {/* Camera Module */}
      <group position={[0, 0.85, 0.07]}>
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.05} />
          </mesh>
        ))}
      </group>

      {/* Camera Glow */}
      <mesh position={[0.2, 0.85, 0.09]}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial color="#4a9eff" emissive="#2a6eff" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Side Buttons */}
      <mesh position={[-0.47, 0.25, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.04]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[-0.47, 0.05, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.04]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0.47, 0.1, 0]}>
        <boxGeometry args={[0.02, 0.12, 0.04]} />
        <meshStandardMaterial color="#ffae42" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* USB-C Port */}
      <mesh position={[0, -0.97, 0.065]}>
        <boxGeometry args={[0.25, 0.03, 0.02]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Speaker Grille */}
      <mesh position={[0, -0.92, 0.065]}>
        <boxGeometry args={[0.55, 0.05, 0.02]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Lights */}
      <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 3, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 5]} intensity={0.8} />
      <ambientLight intensity={0.6} />
    </group>
  )
}

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const perspectiveCamera = camera as ThreePerspectiveCamera
    const isMobile = size.width < 768

    perspectiveCamera.aspect = size.width / size.height
    perspectiveCamera.position.set(0, 0, isMobile ? 6 : 5)
    perspectiveCamera.fov = isMobile ? 50 : 45
    perspectiveCamera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

export function ProductViewer3D() {
  return (
    <div className="relative w-full h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-to-br from-background to-secondary rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ResponsiveCamera />
        <Suspense fallback={<LoadingFallback />}>
          <ModernPhoneModel />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          target={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={2.0}
          enableZoom
          enablePan
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
