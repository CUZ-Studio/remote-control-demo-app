/* eslint-disable react/no-unknown-property */
import { MouseEventHandler, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

import Model from "@/components/organisms/Model";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
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
  const gameRound = useGameStatus();
  const { assignPlayer, updateGameRound } = useGameActions();

  const maxScore = useMemo(
    () => ((player.allRoundScore ?? []).length ? Math.max(...player.allRoundScore) : 0),
    [player.allRoundScore],
  );

  // 재-게임시 실행하게 되는 함수
  const createCharacter: MouseEventHandler = (e) => {
    e.preventDefault();

    // 언리얼로 캐릭터 생성 요청 보내기
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "BindingCharacter",
        parameters: {
          Model: player.model,
          Color: player.color,
          Name: player.headTag,
          UID: user.uid,
        },
        generateTransaction: true,
      })
      .then((res) => {
        const createdCharacterInfo = res.data;
        // 전역상태로 새로운 플레이어 정보 저장
        // 새로운 라운드를 위해 점수는 0점으로 리셋
        assignPlayer({
          ...player,
          uid: user.uid,
          thisRoundScore: 0,
          objectPath: createdCharacterInfo.CharacterPath,
        });

        // 현재 진행중인 게임 라운드의 남은 시간 업데이트
        updateGameRound({
          ...gameRound,
          isGameInProgress: !!Number(createdCharacterInfo.MainGameRemainTime),
          timeLeft: createdCharacterInfo.MainGameRemainTime,
        });

        // 로봇 커스텀 단계 생략하고 바로 게임 실행 화면으로 페이지 이동
        router.push(Page.GOING_TO_HANGAR);
      });
  };
  return (
    <Container>
      <MainSection>
        <TitleWrapper>
          <Welcome>Welcome back!</Welcome>
          <Greeting>{`${user?.displayName}님,\n다시 한 번 출동해볼까요?`}</Greeting>
        </TitleWrapper>
        <GameHistory>
          <Unit>
            <HistoryName>출동수</HistoryName>
            <HistoryContext>{player.playedNum}회</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>전체랭킹</HistoryName>
            <HistoryContext>3위</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>최고점수</HistoryName>
            <HistoryContext>{maxScore}점</HistoryContext>
          </Unit>
        </GameHistory>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10, 15, 10]} />
            <Model />
            <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          </Canvas>
          <StarBox>
            <Image src="/assets/images/star.svg" alt="start" width={17} height={17} />
          </StarBox>
        </CanvasWrapper>
        <RobotName>{player.headTag}</RobotName>
      </MainSection>
      <ButtonWrapper>
        <ResetRobot onClick={() => router.push(Page.SELECT_MODEL)}>로봇 바꾸기</ResetRobot>
        <PlayButton type="button" shape={ButtonShape.RECTANGLE} onClick={createCharacter}>
          출동하기
        </PlayButton>
      </ButtonWrapper>
    </Container>
  );
}
