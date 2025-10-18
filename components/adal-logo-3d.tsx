"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

function AnimatedLogo() {
  const meshRef = useRef<THREE.Group>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      time.current += delta
      // Gentle rotation
      meshRef.current.rotation.y = time.current * 0.5
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(time.current * 2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main "A" shape - composed of geometric primitives */}
      {/* Left leg of A */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#FFC107" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Right leg of A */}
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#FFC107" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Crossbar of A */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.7, 0.12, 0.15]} />
        <meshStandardMaterial color="#FFD54F" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Accent sphere at top */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#FFEB3B"
          metalness={0.8}
          roughness={0.1}
          emissive="#FFC107"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export function AdalLogo3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC107" />
        <AnimatedLogo />
      </Canvas>
    </div>
  )
}
