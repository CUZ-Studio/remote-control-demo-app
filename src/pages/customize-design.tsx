/* eslint-disable react/no-unknown-property */
import { useRouter } from "next/router";

import Picker from "@/components/molecules/Picker";
import Model from "@/components/organisms/Model";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, Page } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  ButtonWrapper,
  CanvasWrapper,
  Container,
  Greeting,
  MainSection,
  NextButton,
} from "@/styles/custom.styles";

export default function CustomizeModel() {
  const router = useRouter();
  const player = usePlayer();
  return (
    <Container>
      <MainSection>
        <Greeting>로봇의 색상을 선택해주세요</Greeting>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.1}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Model />
            <OrbitControls
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              enableZoom={true}
              enablePan={true}
            />
          </Canvas>
        </CanvasWrapper>
        <Picker modelType={player?.model} />
      </MainSection>
      <ButtonWrapper>
        <NextButton
          type="button"
          shape={ButtonShape.RECTANGLE}
          onClick={() => router.push(Page.NAME_YOUR_ROBOT)}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </Container>
  );
}
