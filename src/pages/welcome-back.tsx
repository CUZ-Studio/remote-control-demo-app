/* eslint-disable react/no-unknown-property */
import Image from "next/image";
import { useRouter } from "next/router";

import Model from "@/components/organisms/Model";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  ButtonWrapper,
  CanvasWrapper,
  Container,
  GameHistory,
  Greeting,
  HistoryContext,
  HistoryName,
  MainSection,
  PlayButton,
  ResetRobot,
  RobotName,
  StarBox,
  TitleWrapper,
  Unit,
  Welcome,
} from "@/styles/welcome-back.styles";

export default function WelcomeBack() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  return (
    <Container>
      <MainSection>
        <TitleWrapper>
          <Welcome>Welcome back!</Welcome>
          <Greeting>{`${user.displayName}님,\n다시 한 번 출동해볼까요?`}</Greeting>
        </TitleWrapper>
        <GameHistory>
          <Unit>
            <HistoryName>출동수</HistoryName>
            <HistoryContext>3회</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>전체랭킹</HistoryName>
            <HistoryContext>3위</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>최고점수</HistoryName>
            <HistoryContext>850점</HistoryContext>
          </Unit>
        </GameHistory>
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
              enablePan={true}
            />
          </Canvas>
          <StarBox>
            <Image src="/assets/images/star.svg" alt="start" width={17} height={17} />
          </StarBox>
        </CanvasWrapper>
        <RobotName>{player.headTag}</RobotName>
      </MainSection>
      <ButtonWrapper>
        <ResetRobot onClick={() => router.push(Page.SELECT_MODEL)}>로봇 바꾸기</ResetRobot>
        <PlayButton
          type="button"
          disabled={!!user}
          shape={ButtonShape.RECTANGLE}
          onClick={() => router.push(Page.PLAY)}
        >
          출동하기
        </PlayButton>
      </ButtonWrapper>
    </Container>
  );
}
