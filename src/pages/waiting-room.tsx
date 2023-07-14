/* eslint-disable react/no-unknown-property */
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { isMobile } from "react-device-detect";

import PlayButton from "@/components/atoms/PlayButton";
import Model from "@/components/organisms/Model";
import { getPlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import {
  Page,
  RobotColor,
  RobotModelType,
  Slack_Developer_User_ID,
  Swit_Developer_User_ID,
} from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";
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
  Inner,
  ResetRobot,
  RewardBox,
  RobotName,
  Unit,
} from "@/styles/waiting-room.styles";

export default function WaitingRoom() {
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
          Model: player?.modelType || RobotModelType.SMART_DRONE,
          Color: player?.modelColor || RobotColor.WHITE,
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

        // 사용자가 실제로 게임이 진행중인 장소에 있는지 검증하기 위해
        // 인증코드 선택 페이지로 이동
        // case 1) 사용자가 10분 이내로 인증받은 적이 있다면 → 인증 단계 스킵
        // case 2) 사용자가 인증받은 적이 있지만, 10분이 지났다면 → 인증 필요
        // case 3) 사용자가 인증받은 적이 없다면 → 인증 필요
        if (player?.verifiedAt) {
          const diff = Date.now() - player?.verifiedAt;
          if (diff <= 1000 * 60 * 10) {
            router.push(Page.GOING_TO_HANGAR);
          } else {
            router.push(Page.VERIFY);
          }
        } else {
          router.push(Page.VERIFY);
        }
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
    <Container isMobile={isMobile}>
      <Inner>
        <Greeting>
          {player?.playedNum
            ? `${user?.displayName}님,\n다시 한 번 출동해볼까요?`
            : `${user?.displayName}님,\n힘차게 출동해볼까요?`}
        </Greeting>
        <GameHistory>
          <Unit>
            <HistoryName>출동수</HistoryName>
            <HistoryContext>
              <h4>{player?.playedNum}</h4>
              <h5>회</h5>
            </HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>전체랭킹</HistoryName>
            <HistoryContext>
              <h4>{player?.highestRankEver || "-"}</h4>
              <h5>위</h5>
            </HistoryContext>
          </Unit>
          <Unit>
            <HistoryName>최고점수</HistoryName>
            <HistoryContext>
              <h4>{maxScore}</h4>
              <h5>점</h5>
            </HistoryContext>
          </Unit>
        </GameHistory>
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
        <RewardBox>
          {Array.from(Array(Number(player?.gotFirstPlace) >= 5 ? 5 : player?.gotFirstPlace)).map(
            (_, index) => (
              <Image
                key={`star-${index}`}
                src="/assets/images/star.svg"
                alt="star"
                width={22}
                height={22}
              />
            ),
          )}
        </RewardBox>
        <RobotName>{player?.headTag}</RobotName>
        <ButtonWrapper>
          <ResetRobot onClick={() => router.push(Page.SELECT_MODEL)}>로봇 바꾸기</ResetRobot>
          <PlayButton type="button" disabled={disabled} onClick={createCharacter}>
            출동하기
          </PlayButton>
        </ButtonWrapper>
      </Inner>
    </Container>
  );
}
