/* eslint-disable react/no-unknown-property */
import { useRouter } from "next/router";

import BasicButton from "@/components/atoms/BasicButton";
import Picker from "@/components/molecules/Picker";
import Model from "@/components/organisms/Model";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, Page } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Container } from "@/styles/custom.styles";

export default function CustomizeModel() {
  const router = useRouter();
  const player = usePlayer();
  return (
    <Container>
      <h1>로봇 색상 선택</h1>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Model />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
      <Picker modelType={player?.model} />
      <BasicButton
        type="button"
        shape={ButtonShape.RECTANGLE}
        disabled={!player?.color}
        onClick={() => router.push(Page.NAME_YOUR_ROBOT)}
      >
        내 새끼 이름 지어주러 가기
      </BasicButton>
    </Container>
  );
}
