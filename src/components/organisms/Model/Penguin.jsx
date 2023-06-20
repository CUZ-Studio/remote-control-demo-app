/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 Penguin_Yellow.glb
*/

import { useLayoutEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import { modelColorState } from "@/components/molecules/Picker";
import usePlayer from "@/hooks/usePlayer";
import { RobotColor } from "@/types";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Penguin(props) {
  const ref = useRef();
  const snap = useSnapshot(modelColorState);
  const player = usePlayer();

  const bodyColor = (() => {
    if (player.color) return player.color;
    else {
      return snap.items.Penguin_Material ?? RobotColor.WHITE;
    }
  })();

  const { nodes, materials } = useGLTF(`/assets/models/Penguin/Glb/Penguin.glb`);
  const texture = useTexture(`/assets/models/Penguin/Texture/Penguin_B_${bodyColor}.png`);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, 0);
  });

  useLayoutEffect(() => {
    Object.assign(materials?.Penguin_Material, {
      map: texture,
    });
  }, [materials, texture]);
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={nodes.Penguin.geometry}
        material={materials.Penguin_Material}
        position={[0, -0.6, 0]}
        scale={0.015}
      />
    </group>
  );
}
