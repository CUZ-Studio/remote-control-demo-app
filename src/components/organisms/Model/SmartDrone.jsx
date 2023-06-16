/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 SmartDrone_A.glb
*/

import { useRef } from "react";
import { useSnapshot } from "valtio";

import { modelColorState } from "@/components/molecules/Picker";
import usePlayer from "@/hooks/usePlayer";
import { RobotColor } from "@/types";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function SmartDrone(props) {
  const ref = useRef();
  const snap = useSnapshot(modelColorState);
  const player = usePlayer();

  const bodyColor = (() => {
    if (player.color) return player.color;
    else {
      return snap.items.SmartDrone_Body ?? RobotColor.WHITE;
    }
  })();

  const { nodes, materials } = useGLTF(`/SmartDrone_${bodyColor}.glb`);

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
      <group ref={ref} position={[0.1, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={12}>
        <group ref={ref} scale={0.002}>
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.SM_SmartDrone_LOD2_1.geometry}
            material={materials.SmartDrone_Body}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.SM_SmartDrone_LOD2_2.geometry}
            material={materials.SmartDrone_Face}
          />
        </group>
      </group>
    </group>
  );
}
