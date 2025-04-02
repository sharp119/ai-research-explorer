import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  pulsating?: boolean;
  label?: string;
  showLabel?: boolean;
}

const Node = ({ position, size = 0.2, color = '#ffffff', pulsating = false, label = '', showLabel = false }: NodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (pulsating && meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
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
      
      {showLabel && (
        <Text
          position={[0, size * 1.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  thickness?: number;
  animated?: boolean;
}

const Connection = ({ start, end, color = '#4f46e5', thickness = 0.02, animated = false }: ConnectionProps) => {
  const lineRef = useRef<THREE.Line>(null!);
  
  // Create curve between points
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add some curvature
    const distance = startVec.distanceTo(endVec);
    midPoint.y += distance * 0.2;
    
    const path = new THREE.CubicBezierCurve3(
      startVec,
      new THREE.Vector3().lerpVectors(startVec, midPoint, 0.4),
      new THREE.Vector3().lerpVectors(endVec, midPoint, 0.4),
      endVec
    );
    
    return path;
  }, [start, end]);
  
  // Create points along the curve
  const points = useMemo(() => curve.getPoints(50), [curve]);
  
  useFrame(({ clock }) => {
    if (animated && lineRef.current) {
      const material = lineRef.current.material as THREE.MeshBasicMaterial;
      const time = clock.getElapsedTime();
      
      // Animate the opacity or color
      const opacity = (Math.sin(time * 2) + 1) / 2 * 0.5 + 0.5;
      
      if (material.opacity !== undefined) {
        material.opacity = opacity;
      }
    }
  });
  
  return (
    <Line 
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={thickness}
      transparent
      opacity={0.8}
    />
  );
};

interface LayerProps {
  position: [number, number, number];
  nodeCount: number;
  radius: number;
  name: string;
  color?: string;
  connectToLayer?: LayerProps;
}

const Layer = ({ position, nodeCount, radius, name, color = '#4f46e5', connectToLayer }: LayerProps) => {
  const nodes: JSX.Element[] = [];
  const connections: JSX.Element[] = [];
  
  const positions: [number, number, number][] = [];
  
  // Create nodes arranged in a circle
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const x = position[0] + Math.cos(angle) * radius;
    const y = position[1];
    const z = position[2] + Math.sin(angle) * radius;
    
    const nodePosition: [number, number, number] = [x, y, z];
    positions.push(nodePosition);
    
    nodes.push(
      <Node 
        key={`node-${name}-${i}`}
        position={nodePosition}
        color={color}
        pulsating={i % 3 === 0}
        label={`${name}-${i}`}
        showLabel={false}
      />
    );
  }
  
  // Create connections to another layer if provided
  if (connectToLayer) {
    for (let i = 0; i < nodeCount; i++) {
      const sourcePos = positions[i];
      
      // Connect to a subset of nodes in the target layer
      const connectionCount = Math.min(3, connectToLayer.nodeCount);
      for (let j = 0; j < connectionCount; j++) {
        const targetIdx = Math.floor((i + j) % connectToLayer.nodeCount);
        const targetAngle = (targetIdx / connectToLayer.nodeCount) * Math.PI * 2;
        const tx = connectToLayer.position[0] + Math.cos(targetAngle) * connectToLayer.radius;
        const ty = connectToLayer.position[1];
        const tz = connectToLayer.position[2] + Math.sin(targetAngle) * connectToLayer.radius;
        
        const targetPos: [number, number, number] = [tx, ty, tz];
        
        connections.push(
          <Connection 
            key={`conn-${name}-${i}-${j}`}
            start={sourcePos}
            end={targetPos}
            color={color}
            animated={i % 2 === 0}
          />
        );
      }
    }
  }
  
  return (
    <group>
      <Text
        position={[position[0], position[1] + radius + 0.5, position[2]]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {name}
      </Text>
      {nodes}
      {connections}
    </group>
  );
};

interface DataNodeProps {
  position: [number, number, number];
  size?: number;
  text: string;
}

const DataNode = ({ position, size = 0.3, text }: DataNodeProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group position={position} ref={groupRef}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981"
          emissiveIntensity={0.3}
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {text}
      </Text>
    </group>
  );
};

interface NeuralNetworkSceneProps {
  autoRotate?: boolean;
}

const NeuralNetworkScene = ({ autoRotate = true }: NeuralNetworkSceneProps) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 2, 9);
  }, [camera]);
  
  // Define the neural network layers
  const layers: LayerProps[] = [
    { position: [-4, 0, 0], nodeCount: 8, radius: 1.2, name: "Input", color: "#818cf8" },
    { position: [-1.5, 0, 0], nodeCount: 12, radius: 1.5, name: "Hidden 1", color: "#6366f1" },
    { position: [1.5, 0, 0], nodeCount: 10, radius: 1.3, name: "Hidden 2", color: "#4f46e5" },
    { position: [4, 0, 0], nodeCount: 6, radius: 1, name: "Output", color: "#4338ca" },
  ];
  
  // Create connections between layers
  for (let i = 0; i < layers.length - 1; i++) {
    layers[i].connectToLayer = layers[i + 1];
  }
  
  // Create data nodes
  const dataNodes = [
    { position: [-6, 1, 1] as [number, number, number], text: "RAG" },
    { position: [-6, 0, -1] as [number, number, number], text: "Memory" },
    { position: [-5.5, -1, 0] as [number, number, number], text: "Vectors" },
    { position: [6, 1, 1] as [number, number, number], text: "Agentic" },
    { position: [6, 0, -1] as [number, number, number], text: "CoT" },
    { position: [5.5, -1, 0] as [number, number, number], text: "Planning" },
  ];
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      
      {/* Neural Network Layers */}
      {layers.map((layer, index) => (
        <Layer key={index} {...layer} />
      ))}
      
      {/* Data Nodes */}
      {dataNodes.map((node, index) => (
        <DataNode key={index} position={node.position} text={node.text} />
      ))}
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={5}
      />
    </>
  );
};

interface NeuralNetworkVisualizationProps {
  className?: string;
  autoRotate?: boolean;
}

const NeuralNetworkVisualization = ({ className = "", autoRotate = true }: NeuralNetworkVisualizationProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <NeuralNetworkScene autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkVisualization;
