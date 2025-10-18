"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Text, Center } from "@react-three/drei"
import { Suspense } from "react"

function Logo3DText({ name, color }: { name: string; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <Center>
        <Text fontSize={0.6} color={color} anchorX="center" anchorY="middle">
          {name}
        </Text>
      </Center>
    </Float>
  )
}

export function SponsorLogo3D({ name, color }: { name: string; color: string }) {
  return (
    <div className="w-48 h-40">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#FFC107" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Logo3DText name={name} color={color} />
        </Suspense>
      </Canvas>
    </div>
  )
}
