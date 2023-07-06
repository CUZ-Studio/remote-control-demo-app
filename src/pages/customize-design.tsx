/* eslint-disable react/no-unknown-property */
import { useRouter } from "next/router";

import Lights from "@/components/molecules/Lights";
import Picker from "@/components/molecules/Picker";
import Model from "@/components/organisms/Model";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, Page } from "@/types";
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
          <Canvas shadows camera={{ position: [0, 0.5, 2.6] }}>
            <Lights />
            <Model />
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
