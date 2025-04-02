import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ResearchCenterProps {
  name: string;
  position: [number, number, number];
  size?: number;
  color?: string;
  type: 'government' | 'academic' | 'partnership' | 'industry';
}

const TYPES = {
  government: '#3b82f6',  // blue
  academic: '#8b5cf6',    // purple
  partnership: '#10b981', // green
  industry: '#ef4444',    // red
};

// Research center node with tooltip
const ResearchCenter = ({ name, position, size = 0.15, color, type }: ResearchCenterProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const centerColor = color || TYPES[type];
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Pulsing effect
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={centerColor} 
          emissive={centerColor}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text
        position={[0, size * 2.5, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
        maxWidth={1}
      >
        {name}
      </Text>
    </group>
  );
};

// Connection between centers
const Connection = ({ start, end, color = '#ffffff' }: { start: [number, number, number], end: [number, number, number], color?: string }) => {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} linewidth={1} />
    </line>
  );
};

// A simplified outline of India
const IndiaOutline = () => {
  // These are simplified coordinates for India's outline - not geographically accurate
  const points = [
    [0, 2, 0],     // Northern point
    [1, 1.5, 0],   // Northeast
    [1.5, 0, 0],   // East
    [1, -1.5, 0],  // Southeast
    [0, -2, 0],    // Southern tip
    [-1, -1.5, 0], // Southwest
    [-1.5, 0, 0],  // West
    [-1, 1.5, 0],  // Northwest
    [0, 2, 0],     // Back to north to close the shape
  ];
  
  const linePoints = points.flatMap(p => p);
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(linePoints)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.5} linewidth={2} />
    </line>
  );
};

// Map scene containing the India outline and research centers
const MapScene = () => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  // Research centers data
  const researchCenters: ResearchCenterProps[] = [
    // Government institutions
    { name: 'NITI Aayog', position: [0, 1, 0.1], type: 'government' },
    { name: 'ISI', position: [-0.8, 0.5, 0.1], type: 'government' },
    { name: 'C-DAC', position: [-0.5, -0.8, 0.1], type: 'government' },
    { name: 'DRDO', position: [0.4, 0.9, 0.1], type: 'government' },
    { name: 'ISRO', position: [-0.3, -1.2, 0.1], type: 'government' },
    
    // Academic institutions
    { name: 'IISc', position: [-0.3, -0.7, 0.1], type: 'academic' },
    { name: 'IIT Delhi', position: [0.1, 1.1, 0.1], type: 'academic' },
    { name: 'IIT Bombay', position: [-0.8, -0.4, 0.1], type: 'academic' },
    { name: 'IIT Madras', position: [0.2, -1.5, 0.1], type: 'academic' },
    { name: 'IIIT Hyderabad', position: [0.3, -0.8, 0.1], type: 'academic' },
    { name: 'TIFR', position: [-0.7, -0.5, 0.1], type: 'academic' },
    
    // Public-Private Partnerships
    { name: 'Wadhwani AI', position: [-0.9, -0.3, 0.1], type: 'partnership' },
    { name: 'INDIAai', position: [0.2, 0.8, 0.1], type: 'partnership' },
    
    // Industry-led
    { name: 'Microsoft Research', position: [-0.2, -0.6, 0.1], type: 'industry' },
    { name: 'Google Research', position: [-0.4, -0.5, 0.1], type: 'industry' },
    { name: 'IBM Research', position: [0.5, 0.6, 0.1], type: 'industry' },
    { name: 'NVIDIA AI', position: [0.4, -0.7, 0.1], type: 'industry' },
  ];
  
  // Create connections between some centers (just for visual effect)
  const connections = [
    { start: researchCenters[0].position, end: researchCenters[1].position },
    { start: researchCenters[0].position, end: researchCenters[3].position },
    { start: researchCenters[0].position, end: researchCenters[4].position },
    { start: researchCenters[5].position, end: researchCenters[8].position },
    { start: researchCenters[5].position, end: researchCenters[14].position },
    { start: researchCenters[5].position, end: researchCenters[15].position },
    { start: researchCenters[6].position, end: researchCenters[16].position },
    { start: researchCenters[12].position, end: researchCenters[11].position },
  ];
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Very slow rotation for visual interest
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Base map */}
      <IndiaOutline />
      
      {/* Research centers */}
      {researchCenters.map((center, i) => (
        <ResearchCenter key={i} {...center} />
      ))}
      
      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} />
      ))}
      
      {/* Legend */}
      <group position={[2.5, 1.5, 0]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="left"
          anchorY="middle"
          material-toneMapped={false}
        >
          Research Centers
        </Text>
        
        <group position={[0, 0.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={TYPES.government} />
          </mesh>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.1}
            color="white"
            anchorX="left"
            anchorY="middle"
            material-toneMapped={false}
          >
            Government
          </Text>
        </group>
        
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={TYPES.academic} />
          </mesh>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.1}
            color="white"
            anchorX="left"
            anchorY="middle"
            material-toneMapped={false}
          >
            Academic
          </Text>
        </group>
        
        <group position={[0, -0.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={TYPES.partnership} />
          </mesh>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.1}
            color="white"
            anchorX="left"
            anchorY="middle"
            material-toneMapped={false}
          >
            Partnership
          </Text>
        </group>
        
        <group position={[0, -0.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={TYPES.industry} />
          </mesh>
          <Text
            position={[0.2, 0, 0]}
            fontSize={0.1}
            color="white"
            anchorX="left"
            anchorY="middle"
            material-toneMapped={false}
          >
            Industry
          </Text>
        </group>
      </group>
      
      {/* Title */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.25}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        AI Research in India
      </Text>
    </group>
  );
};

interface IndiaMapProps {
  className?: string;
}

const IndiaMap = ({ className = "" }: IndiaMapProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <MapScene />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
};

export default IndiaMap;
