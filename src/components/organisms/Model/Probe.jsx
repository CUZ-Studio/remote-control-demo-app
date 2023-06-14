/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 Probe_Black.glb
*/

import { useRef } from "react";
import { useSnapshot } from "valtio";

import { modelColorState } from "@/components/molecules/Picker";
import { RobotColor } from "@/types";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Probe(props) {
  const ref = useRef();
  const snap = useSnapshot(modelColorState);

  const { nodes, materials } = useGLTF(`/Probe_${snap.items.Probe ?? RobotColor.BLACK}.glb`);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 4) / 8,
      -0.2 - (1 + Math.sin(t / 1.5)) / 20,
    );
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={ref} position={[0, 0.721, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.probe.geometry}
          material={materials.Probe}
          scale={0.01}
        />
      </group>
    </group>
  );
}
