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
} from "@/styles/customize-design.styles";

export default function CustomizeModel() {
  const router = useRouter();
  const player = usePlayer();
  return (
    <Container>
      <MainSection>
        <Greeting>로봇의 색상을 선택해주세요</Greeting>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10, 15, 10]} />
            <Model />
            <OrbitControls
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
        </CanvasWrapper>
        <Picker modelType={player?.modelType || null} />
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
