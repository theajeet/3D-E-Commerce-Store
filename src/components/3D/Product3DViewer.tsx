import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Product3DProps {
  productId: number;
  category: string;
}

const ProductMesh: React.FC<{ category: string }> = ({ category }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  const getGeometry = () => {
    switch (category) {
      case 'electronics':
        return <boxGeometry args={[1, 0.6, 0.1]} />;
      case 'jewelery':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "men's clothing":
      case "women's clothing":
        return <cylinderGeometry args={[0.6, 0.8, 1.2, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const getMaterial = () => {
    const colors = {
      electronics: '#3B82F6',
      jewelery: '#F59E0B',
      "men's clothing": '#10B981',
      "women's clothing": '#EC4899',
    };
    
    return (
      <meshStandardMaterial
        color={colors[category as keyof typeof colors] || '#6B7280'}
        metalness={category === 'jewelery' ? 0.9 : 0.3}
        roughness={category === 'jewelery' ? 0.1 : 0.4}
      />
    );
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {getGeometry()}
      {getMaterial()}
    </mesh>
  );
};

const Product3DViewer: React.FC<Product3DProps> = ({ productId, category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl"
    >
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[3, 2, 3]} intensity={0.5} color="#F59E0B" />
        
        <ProductMesh category={category} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          autoRotate={false}
        />
        
        <Environment preset="city" />
        
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1E293B" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </motion.div>
  );
};

export default Product3DViewer;