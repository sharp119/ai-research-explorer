import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TechnologyNode {
  name: string;
  category: string;
  position: [number, number, number];
  size?: number;
}

interface AICapabilitiesGlobeProps {
  className?: string;
}

const CATEGORIES = {
  memory: '#6366f1', // primary color for Memory and Information Retrieval
  agentic: '#10b981', // accent color for Agentic Capabilities
  other: '#818cf8', // lighter primary for Other Advanced Capabilities
};

// Convert spherical coordinates to cartesian
const sphericalToCartesian = (radius: number, theta: number, phi: number): [number, number, number] => {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  return [x, y, z];
};

// Create a node with animation
const Node = ({ position, name, category, size = 0.15 }: TechnologyNode) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Get color based on category
  const color = CATEGORIES[category as keyof typeof CATEGORIES] || CATEGORIES.other;
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * 1 + position[0] * 10) * 0.0005;
      
      // Subtle pulsing effect
      const pulse = Math.sin(clock.getElapsedTime() * 2 + position[2]) * 0.05 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
      <Text
        position={[0, size * 2, 0]}
        fontSize={0.1}
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

// Create a connection between a node and the center globe
const Connection = ({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) => {
  // Create a curve for the connection
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add a slight curve
    const midOffset = 0.3; // How much the midpoint deviates from the straight line
    const dir = new THREE.Vector3().subVectors(endVec, startVec).normalize();
    const perpDir = new THREE.Vector3(-dir.y, dir.x, dir.z).normalize();
    mid.add(perpDir.multiplyScalar(midOffset));
    
    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    return curve.getPoints(20);
  }, [start, end]);
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.4} linewidth={1} />
    </line>
  );
};

// Main globe visualization
const Globe = () => {
  const { camera } = useThree();
  const globeRef = useRef<THREE.Mesh>(null!);
  
  useEffect(() => {
    camera.position.set(0, 0, 8);
  }, [camera]);
  
  // Create nodes representing different AI technologies
  const technologies: TechnologyNode[] = [
    // Memory and Information Retrieval
    { name: 'RAG', category: 'memory', position: sphericalToCartesian(3, 0, Math.PI/4) },
    { name: 'Vector DB', category: 'memory', position: sphericalToCartesian(3, Math.PI/3, Math.PI/3) },
    { name: 'Knowledge Graphs', category: 'memory', position: sphericalToCartesian(3, 2*Math.PI/3, Math.PI/4) },
    { name: 'Long-Term Memory', category: 'memory', position: sphericalToCartesian(3, Math.PI, Math.PI/5) },
    { name: 'EMG-RAG', category: 'memory', position: sphericalToCartesian(3, 4*Math.PI/3, Math.PI/4) },
    
    // Agentic Capabilities
    { name: 'Agentic AI', category: 'agentic', position: sphericalToCartesian(3, Math.PI/6, 2*Math.PI/3) },
    { name: 'Function Calling', category: 'agentic', position: sphericalToCartesian(3, Math.PI/2, 2*Math.PI/3) },
    { name: 'Chain-of-Thought', category: 'agentic', position: sphericalToCartesian(3, 5*Math.PI/6, 2*Math.PI/3) },
    { name: 'Autonomous Planning', category: 'agentic', position: sphericalToCartesian(3, 7*Math.PI/6, 2*Math.PI/3) },
    { name: 'Reflexion', category: 'agentic', position: sphericalToCartesian(3, 3*Math.PI/2, 2*Math.PI/3) },
    
    // Other Advanced Capabilities
    { name: 'In-Context Learning', category: 'other', position: sphericalToCartesian(3, 0, 5*Math.PI/6) },
    { name: 'Multimodal Processing', category: 'other', position: sphericalToCartesian(3, Math.PI/2, 5*Math.PI/6) },
    { name: 'Prompt Engineering', category: 'other', position: sphericalToCartesian(3, Math.PI, 5*Math.PI/6) },
    { name: 'Fine-tuning', category: 'other', position: sphericalToCartesian(3, 3*Math.PI/2, 5*Math.PI/6) },
  ];
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      // Gentle rotation
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <>
      {/* Central globe representing AI core */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#1e1b4b" 
          roughness={0.7} 
          metalness={0.3} 
          emissive="#312e81"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Core text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        AI Core
      </Text>
      
      {/* Outer ring */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[2.9, 3.1, 64]} />
        <meshStandardMaterial 
          color="#4338ca" 
          emissive="#4338ca"
          emissiveIntensity={0.3}
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Technology nodes */}
      {technologies.map((tech, i) => (
        <Node key={i} {...tech} />
      ))}
      
      {/* Connections to center */}
      {technologies.map((tech, i) => (
        <Connection 
          key={`conn-${i}`} 
          start={tech.position} 
          end={[0, 0, 0]} 
          color={CATEGORIES[tech.category as keyof typeof CATEGORIES] || '#ffffff'} 
        />
      ))}
      
      {/* Category labels */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.25}
        color={CATEGORIES.memory}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Memory & Information Retrieval
      </Text>
      
      <Text
        position={[4, 0, 0]}
        fontSize={0.25}
        color={CATEGORIES.agentic}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Agentic Capabilities
      </Text>
      
      <Text
        position={[-4, 0, 0]}
        fontSize={0.25}
        color={CATEGORIES.other}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Advanced Capabilities
      </Text>
    </>
  );
};

const AICapabilitiesGlobe = ({ className = "" }: AICapabilitiesGlobeProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
        <Globe />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
};

export default AICapabilitiesGlobe;
