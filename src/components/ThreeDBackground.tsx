
import React from "react";
import { Canvas } from "@react-three/fiber";
import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei";

function AnimatedShapes() {
  return (
    <>
      {/* كرة متحركة */}
      <mesh position={[-2, 0, -4]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#34d399" roughness={0.4} metalness={0.9} />
      </mesh>
      {/* مكعبان متداخلان */}
      <mesh position={[2, 0, -5]} rotation={[0.4, 0.4, 0.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* طارة/حلقة متحركة */}
      <mesh position={[0, 2.2, -6]} rotation={[0.35, 0.2, 0]}>
        <torusGeometry args={[0.8, 0.21, 24, 64]} />
        <meshStandardMaterial color="#a21caf" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* إضاءة */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 5]} intensity={1.1} />
    </>
  );
}

// لمنظور تلقائي وتفاعل بالعجلة فقط (مع تعطيل الدوران من المستخدم)
const Controls = () => (
  <OrbitControls
    enablePan={false}
    enableZoom={false}
    enableRotate={false}
  />
);

const ThreeDBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: "none",
        filter: "blur(0.5px) brightness(0.86)",
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #e1ffe8 20%, #f0fdfa 100%)",
        }}
      >
        <Controls />
        <AnimatedShapes />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
