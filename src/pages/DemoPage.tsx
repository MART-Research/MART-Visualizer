// src/pages/DemoPage.tsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TopologyScene from "../lib/three/TopologyScene";

// Types
type TopologyType =
  | "mesh"
  | "ring"
  | "torus"
  | "tree"
  | "hypercube"
  | "butterfly"
  | "dragonfly";
type MappingTech =
  | "ACO"
  | "BnB"
  | "GA"
  | "Greedy"
  | "KNN"
  | "PSO"
  | "Q-learning"
  | "SA"
  | "TS"
  | "Static";
type RoutingAlgo =
  | "Destination Tag Routing"
  | "Dimension Order Routing"
  | "Variable Dimension Order Routing"
  | "XOR-Tag Routing"
  | "Valiant Routing"
  | "Minimal Oblivious Routing"
  | "Load-Balanced Oblivious Routing";

const DemoPage: React.FC = () => {
  // Form state
  const [topology, setTopology] = useState<TopologyType>("mesh");
  const [topo2D3D, setTopo2D3D] = useState<"2D" | "3D">("2D");
  const [topoParams, setTopoParams] = useState<any>({
    dimX: 1,
    dimY: 1,
    dimZ: 1,
    n: 4,
    k: 2, // butterfly default k=2
    levels: 1,
    branching: 2,
    dimensions: 1, // hypercube default dimensions=1
  });

  const [mapping, setMapping] = useState<MappingTech>("ACO");
  const [mapParams, setMapParams] = useState<any>({
    ants: 10,
    iterations: 100,
    alpha: 1,
    beta: 2,
    evaporation: 0.5,
    population: 50,
    generations: 100,
    crossover: 0.7,
    mutation: 0.01,
    k: 5,
    swarm: 20,
    w: 0.5,
    c1: 1,
    c2: 1,
    alphaQ: 0.1,
    gamma: 0.9,
    epsilon: 0.1,
    temp: 100,
    cooling: 0.95,
    tabuIt: 100,
    tenure: 5,
    neighborhood: 10,
    overloadPenalty: 0.1,
  });

  const [routing, setRouting] = useState<RoutingAlgo>(
    "Dimension Order Routing"
  );
  const [virtualChannels, setVirtualChannels] = useState<number>(1);

  const handleProcess = () => {
    const payload = {
      topology: { type: topology, sub: topo2D3D, params: topoParams },
      mapping: { technique: mapping, params: mapParams },
      routing,
      virtualChannels,
    };
    console.log("Payload", payload);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#181a20] via-[#2a304d] to-[#39426f] text-white">
      {/* Left panel */}
      {/* Left panel wrapper for animated border */}
      <div className="w-full md:w-1/3 p-0 relative animated-gradient-border">
        {/* Scrollable content inside wrapper */}
        <div className="h-full p-6 space-y-6 overflow-y-auto futuristic-scrollbar glass-panel">
          {/* Topology */}
          <div className="p-6 rounded-lg shadow-lg glass-panel">
            <h2 className="mb-4 text-2xl font-bold text-green-400 shimmer-text">
              Topology
            </h2>
            <select
              className="w-full mb-2 rounded bg-gray-800 p-3 text-lg text-gray-300 focus:outline-none gradient-border custom-select"
              value={topology}
              onChange={(e) => setTopology(e.target.value as TopologyType)}
            >
              <option value="mesh">Mesh</option>
              <option value="ring">Ring</option>
              <option value="torus">Torus</option>
              <option value="tree">Tree</option>
              <option value="hypercube">Hypercube</option>
              <option value="butterfly">Butterfly</option>
              <option value="dragonfly">Dragonfly</option>
            </select>

            {/* Subcategory for 2D/3D where applicable */}
            {["mesh"].includes(topology) && (
              <select
                className="w-full mb-4 rounded bg-gray-800 p-3 text-lg text-gray-300 focus:outline-none gradient-border custom-select"
                value={topo2D3D}
                onChange={(e) => setTopo2D3D(e.target.value as "2D" | "3D")}
              >
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            )}
            {topology === "torus" && null}

            {/* Specific inputs */}
            {topology === "mesh" && (
              <>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Dim X
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.dimX}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        dimX: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Dim Y
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.dimY}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        dimY: +e.target.value,
                      }))
                    }
                  />
                </div>
                {/* {topo2D3D === "3D" && (
                <p className="text-red-400">3D mesh not supported</p>
              )} */}
                {topo2D3D === "3D" && (
                  <div className="mb-2 gradient-border p-2">
                    <label className="block text-sm font-medium text-gray-400">
                      Dim Z
                    </label>
                    <input
                      type="number"
                      className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                      value={topoParams.dimZ}
                      onChange={(e) =>
                        setTopoParams((p: typeof topoParams) => ({
                          ...p,
                          dimZ: +e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </>
            )}
            {topology === "ring" && (
              <div className="mb-2 gradient-border p-2">
                <label className="block text-sm font-medium text-gray-400">
                  Nodes (n)
                </label>
                <input
                  type="number"
                  className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                  value={topoParams.n}
                  onChange={(e) =>
                    setTopoParams((p: typeof topoParams) => ({
                      ...p,
                      n: +e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {topology === "torus" && (
              <>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Dim X
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.dimX}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        dimX: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Dim Y
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.dimY}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        dimY: +e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}
            {topology === "tree" && (
              <>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Levels
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.levels}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        levels: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Branching Factor
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={topoParams.branching}
                    onChange={(e) =>
                      setTopoParams((p: typeof topoParams) => ({
                        ...p,
                        branching: +e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}
            {topology === "hypercube" && (
              <div className="mb-2 gradient-border p-2">
                <label className="block text-sm font-medium text-gray-400">
                  Dimensions
                </label>
                <input
                  type="number"
                  className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                  value={topoParams.dimensions}
                  onChange={(e) =>
                    setTopoParams((p: typeof topoParams) => ({
                      ...p,
                      dimensions: +e.target.value,
                    }))
                  }
                />
                {topoParams.dimensions > 3 && (
                  <p className="text-yellow-400 mt-2">
                    Visualization for hypercube networks in more than 3D is not
                    supported.
                  </p>
                )}
              </div>
            )}
            {topology === "butterfly" && (
              <div className="mb-2 gradient-border p-2">
                <label className="block text-sm font-medium text-gray-400">
                  k (arity)
                </label>
                <input
                  type="number"
                  className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                  value={topoParams.k}
                  onChange={(e) =>
                    setTopoParams((p: typeof topoParams) => ({
                      ...p,
                      k: +e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {topology === "dragonfly" && (
              <p>No params—rendering 2D dragonfly</p>
            )}
          </div>

          {/* Mapping */}
          <div className="p-6 rounded-lg shadow-lg glass-panel">
            <h2 className="mb-4 text-2xl font-bold text-blue-400 shimmer-text">
              Mapping Technique
            </h2>
            <select
              className="w-full mb-2 rounded bg-gray-800 p-3 text-lg text-gray-300 focus:outline-none gradient-border custom-select"
              value={mapping}
              onChange={(e) => setMapping(e.target.value as MappingTech)}
            >
              {[
                "ACO",
                "BnB",
                "GA",
                "Greedy",
                "KNN",
                "PSO",
                "Q-learning",
                "SA",
                "TS",
                "Static",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {/* Common overload penalty */}
            {mapping !== "Static" && (
              <div className="mb-2 gradient-border p-2">
                <label className="block text-sm font-medium text-gray-400">
                  Overload Penalty
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                  value={mapParams.overloadPenalty}
                  onChange={(e) =>
                    setMapParams((p: typeof mapParams) => ({
                      ...p,
                      overloadPenalty: +e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {/* Technique-specific */}
            {mapping === "ACO" && (
              <>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Ants
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={mapParams.ants}
                    onChange={(e) =>
                      setMapParams((p: typeof mapParams) => ({
                        ...p,
                        ants: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Iterations
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={mapParams.iterations}
                    onChange={(e) =>
                      setMapParams((p: typeof mapParams) => ({
                        ...p,
                        iterations: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Alpha
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={mapParams.alpha}
                    onChange={(e) =>
                      setMapParams((p: typeof mapParams) => ({
                        ...p,
                        alpha: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Beta
                  </label>
                  <input
                    type="number"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={mapParams.beta}
                    onChange={(e) =>
                      setMapParams((p: typeof mapParams) => ({
                        ...p,
                        beta: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-2 gradient-border p-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Evaporation Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                    value={mapParams.evaporation}
                    onChange={(e) =>
                      setMapParams((p: typeof mapParams) => ({
                        ...p,
                        evaporation: +e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}
            {mapping === "BnB" && null}
            {mapping === "GA" && <>...</>}
            {/* Continue for each mapping... */}
          </div>

          {/* Routing */}
          <div className="p-6 rounded-lg shadow-lg glass-panel">
            <h2 className="mb-4 text-2xl font-bold text-purple-400 shimmer-text">
              Routing Algorithm
            </h2>
            <select
              className="w-full mb-2 rounded bg-gray-800 p-3 text-lg text-gray-300 focus:outline-none gradient-border custom-select"
              value={routing}
              onChange={(e) => setRouting(e.target.value as RoutingAlgo)}
            >
              {[
                "Destination Tag Routing",
                "Dimension Order Routing",
                "Variable Dimension Order Routing",
                "XOR-Tag Routing",
                "Valiant Routing",
                "Minimal Oblivious Routing",
                "Load-Balanced Oblivious Routing",
              ].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="mb-2 gradient-border p-2">
              <label className="block text-sm font-medium text-gray-400">
                Virtual Channels
              </label>
              <input
                type="number"
                className="w-full rounded bg-gray-700 p-3 text-lg text-gray-300 focus:outline-none"
                value={virtualChannels}
                onChange={(e) => setVirtualChannels(+e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            className="w-full rounded-lg bg-gradient-to-r from-[#7f5fff] to-[#5ce1e6] py-3 text-lg font-semibold text-white hover:from-[#5ce1e6] hover:to-[#7f5fff] transition duration-300 shadow-lg mt-2"
          >
            Process
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden md:block md:w-2/3 relative">
        <Canvas className="absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TopologyScene type={topology} sub={topo2D3D} params={topoParams} />
          <OrbitControls enablePan={true} panSpeed={1.0} />
        </Canvas>
      </div>
    </div>
  );
};
export default DemoPage;
