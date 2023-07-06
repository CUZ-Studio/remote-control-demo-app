/* eslint-disable react/no-unknown-property */
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

import Lights from "@/components/molecules/Lights";
import Model from "@/components/organisms/Model";
import { getPlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import { ButtonShape, Page, Slack_Developer_User_ID, Swit_Developer_User_ID } from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";
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
  RewardBox,
  RobotName,
  TitleWrapper,
  Unit,
  Welcome,
} from "@/styles/welcome-back.styles";

export default function WelcomeBack() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameStatus();
  const { assignPlayer, updateGameRound } = useGameActions();

  const maxScore = useMemo(() => {
    return Object.values(player?.allRoundScore ?? {}).length
      ? Math.max(...Object.values(player?.allRoundScore ?? {}).map((elem) => Number(elem)))
      : 0;
  }, [player]);

  // 게임이 끝나고 다시 출동하는 경우,
  // 방금 끝난 게임 라운드에서 받은 점수 및 역대 최고 점수, 등수를 업데이트해야 함
  useEffect(() => {
    if (_.isNil(user)) return;

    getPlayer(user.uid).then(async (res) => {
      if (res.length === 0) return;
      const { score, playedNum, gotFirstPlace } = res[0];

      assignPlayer({
        ...(player as Player),
        thisRoundScore: 0,
        allRoundScore: score ?? {},
        playedNum: playedNum ?? 0,
        gotFirstPlace: gotFirstPlace ?? 0,
      });
    });
  }, [user]);

  // 재-게임시 실행하게 되는 함수
  const createCharacter: MouseEventHandler = async (e) => {
    e.preventDefault();

    setDisabled(true);

    // 언리얼로 캐릭터 생성 요청 보내기
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "BindingCharacter",
        parameters: {
          Model: player?.modelType,
          Color: player?.modelColor,
          Name: player?.headTag,
          UID: user?.uid,
          PlayerWinCount: Number(player?.gotFirstPlace) || 0,
          ProfileURL: user?.image,
        },
        generateTransaction: true,
      })
      .then((res) => {
        const createdCharacterInfo = res.data;
        // 전역상태로 새로운 플레이어 정보 저장
        // 새로운 라운드를 위해 점수는 0점으로 리셋
        if (user)
          assignPlayer({
            ...(player as Player),
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
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        setDisabled(false);
        const notice = {
          isUrgent: true,
          errorName: error.name,
          errorCode: error.response?.status || error.code,
          errorMessage: `"BindingCharacter" 함수에서 다음 에러 발생: ${
            error?.message || error.response?.data.errorMessage
          }`,
        };
        noticeToSlack({
          ...notice,
          assignees: [Slack_Developer_User_ID.GODA, Slack_Developer_User_ID.GUNI],
        });
        noticeToSWIT({
          ...notice,
          assignees: [Swit_Developer_User_ID.GODA, Swit_Developer_User_ID.GUNI],
        });
      });
  };

  useEffect(() => {
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "GetGameRanking",
      })
      .then((res) => {
        const highestRankEver = res.data.gameRanking.findIndex(
          (elem: string) => elem === user?.uid,
        );
        if (highestRankEver > -1) {
          assignPlayer({
            ...(player as Player),
            highestRankEver: highestRankEver + 1,
          });
        }
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status || error.code,
          errorMessage: `"GetGameRanking" 함수에서 다음 에러 발생: ${
            error?.message || error.response?.data.errorMessage
          }`,
        };
        noticeToSlack({
          ...notice,
          assignees: [Slack_Developer_User_ID.GODA, Slack_Developer_User_ID.GUNI],
        });
        noticeToSWIT({
          ...notice,
          assignees: [Swit_Developer_User_ID.GODA, Swit_Developer_User_ID.GUNI],
        });
      });
  }, []);
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
            <HistoryContext>{player?.playedNum}회</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>전체랭킹</HistoryName>
            <HistoryContext>{player?.highestRankEver || "-"}위</HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>최고점수</HistoryName>
            <HistoryContext>{maxScore}점</HistoryContext>
          </Unit>
        </GameHistory>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0.5, 2.6] }}>
            <Lights />
            <Model />
          </Canvas>
          <RewardBox>
            {Array.from(Array(Number(player?.gotFirstPlace) >= 5 ? 5 : player?.gotFirstPlace)).map(
              (_, index) => (
                <Image
                  key={`star-${index}`}
                  src="/assets/images/star.svg"
                  alt="start"
                  width={17}
                  height={17}
                />
              ),
            )}
          </RewardBox>
        </CanvasWrapper>
        <RobotName>{player?.headTag}</RobotName>
      </MainSection>
      <ButtonWrapper>
        <ResetRobot onClick={() => router.push(Page.SELECT_MODEL)}>로봇 바꾸기</ResetRobot>
        <PlayButton
          type="button"
          shape={ButtonShape.RECTANGLE}
          disabled={disabled}
          onClick={createCharacter}
        >
          출동하기
        </PlayButton>
      </ButtonWrapper>
    </Container>
  );
}
