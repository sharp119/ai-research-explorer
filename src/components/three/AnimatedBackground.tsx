import { useRef, useEffect } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

extend({ OrbitControls });

interface EffectProps {
  color: string;
  position: [number, number, number];
  size: number;
  speed: number;
  distort: number;
}

const BlobEffect = ({ color, position, size, speed, distort }: EffectProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.2) * 0.2;
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * speed * 0.2) * 0.2;
      mesh.current.position.z = Math.sin(clock.getElapsedTime() * speed * 0.2) * 0.5;
    }
  });
  
  return (
    <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial 
        color={color} 
        attach="material" 
        distort={distort} 
        speed={speed} 
        roughness={0.5} 
        metalness={0.2}
        opacity={0.8}
        transparent
      />
    </Sphere>
  );
};

const ParticleField = () => {
  const { camera } = useThree();
  const particlesRef = useRef<THREE.Points>(null!);
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);
  
  // Create particles
  const particleCount = 400;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 40; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    
    // Color
    colors[i * 3] = Math.random() * 0.3 + 0.2; // r
    colors[i * 3 + 1] = Math.random() * 0.3 + 0.5; // g
    colors[i * 3 + 2] = Math.random() * 0.3 + 0.7; // b
    
    // Size
    sizes[i] = Math.random() * 0.1;
  }
  
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  // Animation
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.075;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial 
        attach="material" 
        vertexColors 
        size={0.1} 
        sizeAttenuation 
        transparent 
        alphaTest={0.5}
        opacity={0.6}
      />
    </points>
  );
};

const NeuralConnections = () => {
  const { camera } = useThree();
  const connectionsRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);
  
  // Create connections
  const connectionCount = 20;
  const connections: JSX.Element[] = [];
  
  for (let i = 0; i < connectionCount; i++) {
    const startPoint = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    
    const endPoint = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    
    const points = [];
    points.push(startPoint);
    
    // Add control points for curve
    const controlPoint1 = new THREE.Vector3(
      (startPoint.x + endPoint.x) / 2 + (Math.random() - 0.5) * 3,
      (startPoint.y + endPoint.y) / 2 + (Math.random() - 0.5) * 3,
      (startPoint.z + endPoint.z) / 2 + (Math.random() - 0.5) * 3
    );
    
    points.push(controlPoint1);
    points.push(endPoint);
    
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
    
    // Random color from blue to purple gradient
    const hue = 0.6 + Math.random() * 0.1; // Blue to purple hue range
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
    
    connections.push(
      <mesh key={i} geometry={geometry}>
        <meshBasicMaterial attach="material" color={color.getHex()} transparent opacity={0.6} />
      </mesh>
    );
  }
  
  // Animation
  useFrame(({ clock }) => {
    if (connectionsRef.current) {
      connectionsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      connectionsRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.2;
      connectionsRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });
  
  return <group ref={connectionsRef}>{connections}</group>;
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        
        <BlobEffect 
          color="#4338ca" 
          position={[-4, 2, 0]} 
          size={1.5} 
          speed={2} 
          distort={0.4} 
        />
        
        <BlobEffect 
          color="#10b981" 
          position={[4, -2, -2]} 
          size={2} 
          speed={1.5} 
          distort={0.3} 
        />
        
        <ParticleField />
        <NeuralConnections />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
