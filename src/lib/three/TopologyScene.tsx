// src/lib/three/TopologyScene.tsx
import React, { useMemo } from "react";
import {
  Mesh,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  PointsMaterial,
} from "three";
import { useFrame } from "@react-three/fiber";

interface TopologySceneProps {
  type: string;
  sub?: "2D" | "3D";
  params: Record<string, number>;
}

const TopologyScene: React.FC<TopologySceneProps> = ({
  type,
  sub = "2D",
  params,
}) => {
  const { geometry, lineMaterial, pointsMaterial } = useMemo(() => {
    const geo = new BufferGeometry();
    const vertices: number[] = [];

    // helper to add edge
    const addEdge = (a: number[], b: number[]) => {
      vertices.push(...a, ...b);
    };

    switch (type) {
      case "mesh": {
        const { dimX = 1, dimY = 1, dimZ = 1 } = params; // Restored dimZ for 3D rendering

        // loop through nodes
        const positions: number[][] = [];
        for (let x = 0; x < dimX; x++) {
          for (let y = 0; y < dimY; y++) {
            for (let z = 0; z < (sub === "3D" ? dimZ : 1); z++) {
              positions.push([
                x - (dimX - 1) / 2,
                y - (dimY - 1) / 2,
                z - ((sub === "3D" ? dimZ : 1) - 1) / 2,
              ]);
            }
          }
        }
        // build edges
        const idx = (x: number, y: number, z: number) =>
          x * dimY * (sub === "3D" ? dimZ : 1) +
          y * (sub === "3D" ? dimZ : 1) +
          z;
        positions.forEach((pos, i) => {
          const [x, y, z] = pos.map((v, idx) => {
            if (idx === 0) return v + (dimX - 1) / 2;
            if (idx === 1) return v + (dimY - 1) / 2;
            return v + ((sub === "3D" ? dimZ : 1) - 1) / 2;
          });
          // neighbor +X
          if (x < dimX - 1) {
            const j = idx(x + 1, y, z);
            addEdge(positions[i], positions[j]);
          }
          // +Y
          if (y < dimY - 1) {
            const j = idx(x, y + 1, z);
            addEdge(positions[i], positions[j]);
          }
          // +Z if 3D
          if (sub === "3D" && z < dimZ - 1) {
            const j = idx(x, y, z + 1);
            addEdge(positions[i], positions[j]);
          }
        });
        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      case "ring": {
        const { n = 4 } = params;
        const radius = 3;
        const positions: number[][] = [];
        for (let i = 0; i < n; i++) {
          const theta = (i / n) * Math.PI * 2;
          positions.push([
            radius * Math.cos(theta),
            0,
            radius * Math.sin(theta),
          ]);
        }
        positions.forEach((pos, i) => {
          const next = (i + 1) % n;
          addEdge(pos, positions[next]);
        });
        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      case "torus": {
        const { dimX = 8, dimY = 4 } = params;
        // interpret dimX=tube segments, dimY=radial segments
        const R = 3,
          r = 1;
        const positions: number[][] = [];
        for (let i = 0; i < dimX; i++) {
          const u = (i / dimX) * 2 * Math.PI;
          for (let j = 0; j < dimY; j++) {
            const v = (j / dimY) * 2 * Math.PI;
            const x = (R + r * Math.cos(v)) * Math.cos(u);
            const y = r * Math.sin(v);
            const z = (R + r * Math.cos(v)) * Math.sin(u);
            positions.push([x, y, z]);
          }
        }
        const idx2 = (i: number, j: number) => i * dimY + j;
        positions.forEach((pos, i) => {
          const j = i % dimY;
          const k = Math.floor(i / dimY);
          // link around tube
          addEdge(pos, positions[idx2(k, (j + 1) % dimY)]);
          // link around ring
          addEdge(pos, positions[idx2((k + 1) % dimX, j)]);
        });
        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      case "tree": {
        const { levels = 1, branching = 2 } = params;
        const positions: number[][] = [];

        // Recursive function to generate tree nodes
        const generateTree = (
          level: number,
          parentPos: number[],
          angle: number
        ) => {
          if (level > levels) return;

          for (let i = 0; i < branching; i++) {
            const theta = (i / branching) * Math.PI * 2 + angle;
            const radius = 2 / level; // Decrease radius as levels increase
            const x = parentPos[0] + radius * Math.cos(theta);
            const y = parentPos[1] - 1; // Move down for each level
            const z = parentPos[2] + radius * Math.sin(theta);

            const childPos = [x, y, z];
            positions.push(childPos);
            addEdge(parentPos, childPos);

            // Recursively generate children
            generateTree(level + 1, childPos, theta);
          }
        };

        // Root node
        const rootPos = [0, 0, 0];
        positions.push(rootPos);
        generateTree(1, rootPos, 0);

        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      case "hypercube": {
        const { dimensions = 3 } = params;

        if (dimensions < 1 || dimensions > 3) {
          console.warn(
            "Hypercube dimensions should be between 1 and 3 for visualization."
          );
          // Return empty geometry for unsupported dimensions
          geo.setAttribute("position", new Float32BufferAttribute([], 3));
          break;
        }

        const positions: number[][] = [];

        if (dimensions === 1) {
          // 1D: Line of points
          positions.push([-1, 0, 0], [1, 0, 0]);
          addEdge(positions[0], positions[1]);
        } else if (dimensions === 2) {
          // 2D: Square
          positions.push([-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0]);
          addEdge(positions[0], positions[1]);
          addEdge(positions[1], positions[2]);
          addEdge(positions[2], positions[3]);
          addEdge(positions[3], positions[0]);
        } else if (dimensions === 3) {
          // 3D: Cube
          positions.push(
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1]
          );
          // Bottom square
          addEdge(positions[0], positions[1]);
          addEdge(positions[1], positions[2]);
          addEdge(positions[2], positions[3]);
          addEdge(positions[3], positions[0]);
          // Top square
          addEdge(positions[4], positions[5]);
          addEdge(positions[5], positions[6]);
          addEdge(positions[6], positions[7]);
          addEdge(positions[7], positions[4]);
          // Vertical edges
          addEdge(positions[0], positions[4]);
          addEdge(positions[1], positions[5]);
          addEdge(positions[2], positions[6]);
          addEdge(positions[3], positions[7]);
        }

        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      case "butterfly": {
        const { k = 2 } = params; // k: arity
        const positions: number[][] = [];

        // Generate positions for each stage
        const stages = Math.ceil(Math.log2(k)) + 1; // Number of stages based on k
        for (let stage = 0; stage < stages; stage++) {
          for (let node = 0; node < k; node++) {
            const x = stage * 2; // Spread stages along x-axis
            const y = node - k / 2; // Center nodes vertically
            const z = 0; // Keep nodes in the same z-plane
            positions.push([x, y, z]);
          }
        }

        // Add edges between nodes in consecutive stages
        for (let stage = 0; stage < stages - 1; stage++) {
          for (let i = 0; i < k; i++) {
            const currentNodeIndex = stage * k + i;
            const nextNodeIndex =
              (stage + 1) * k + (i ^ (1 << stage % Math.ceil(Math.log2(k))));
            if (positions[currentNodeIndex] && positions[nextNodeIndex]) {
              addEdge(positions[currentNodeIndex], positions[nextNodeIndex]);
            }
          }
        }

        // Add vertical connections between nodes in consecutive stages
        for (let stage = 0; stage < stages - 1; stage++) {
          for (let i = 0; i < k; i++) {
            const currentNodeIndex = stage * k + i;
            const nextNodeIndex = (stage + 1) * k + i; // Vertical connection to the same node index in the next stage
            if (positions[currentNodeIndex] && positions[nextNodeIndex]) {
              addEdge(positions[currentNodeIndex], positions[nextNodeIndex]);
            }
          }
        }

        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        break;
      }

      default:
        break;
    }

    return {
      geometry: geo,
      lineMaterial: new LineBasicMaterial({ color: 0x00ffff, linewidth: 1 }),
      pointsMaterial: new PointsMaterial({ color: 0xff77ff, size: 0.1 }),
    };
  }, [type, sub, params]);

  // animation (e.g. rotate group)
  const groupRef = React.useRef<Mesh>(null!);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* render edges */}
      <lineSegments geometry={geometry} material={lineMaterial} />
      {/* render nodes */}
      <points geometry={geometry} material={pointsMaterial} />
    </group>
  );
};

export default TopologyScene;
