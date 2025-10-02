import React from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, BufferGeometry, Float32BufferAttribute } from "three";

const LandingScene: React.FC = () => {
  const meshRef = React.useRef<Mesh>(null!);

  // Simple rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Wireframe cube geometry as placeholder
  const geometry = React.useMemo(() => {
    const geo = new BufferGeometry();
    const vertices = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1,
    ];
    const indices = [
      0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
    ];
    geo.setIndex(indices);
    geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial wireframe color="#00bfff" />
    </mesh>
  );
};

export default LandingScene;
