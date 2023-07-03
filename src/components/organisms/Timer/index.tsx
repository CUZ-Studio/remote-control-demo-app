import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import usePrevious from "@/hooks/usePrevious";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import { Page, Slack_Developer_User_ID, Swit_Developer_User_ID, TimeSchedule } from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";

export default function Countdown() {
  const router = useRouter();
  const gameRound = useGameStatus();
  const prevTimeSchedule = usePrevious(gameRound.currentTimeSchedule);

  const user = useUser();
  const player = usePlayer();
  const { assignPlayer, updateGameRound } = useGameActions();
  const [isGaming, setIsGaming] = useState(false);

  const countDown = useMemo(() => {
    if (_.isNil(gameRound?.timeLeft)) return 0;
    if (gameRound?.timeLeft - 180 > 0)
      return (gameRound?.timeLeft - 180 + 1) * 1000 + new Date().getTime();
    return 0;
  }, [gameRound?.timeLeft]);
  const [countDownLeft, setCountDownLeft] = useState(countDown - Date.now());

  const targetDate = useMemo(() => {
    return ((gameRound?.timeLeft || 0) + 1) * 1000 + new Date().getTime();
    // 플레이어 상대경로가 변화할 때마다 새로운 라운드가 시작했다는 의미이므로,
    // 남은 시간을 다시 계산해줘야 함
  }, [gameRound?.timeLeft, player?.objectPath]);
  const [gameTimeLeft, setGameTimeLeft] = useState(targetDate - Date.now());

  const targetRestTime = 28 * 1000 + new Date().getTime();
  const [restTimeLeft, setRestTimeLeft] = useState(targetRestTime - Date.now());

  // 카운트다운 타이머
  useEffect(() => {
    if (countDownLeft < 0) return;

    const interval = setInterval(() => {
      const countDownOffset = countDown - Date.now();
      if (countDownOffset > 0) {
        setCountDownLeft(countDown - Date.now());
        updateGameRound({
          ...gameRound,
          isGameInProgress: false,
          currentTimeSchedule: TimeSchedule.COUNTDOWN,
        });
      } else {
        setGameTimeLeft(180 * 1000);
        if (prevTimeSchedule === TimeSchedule.COUNTDOWN) {
          updateGameRound({
            ...gameRound,
            isGameInProgress: true,
            currentTimeSchedule: TimeSchedule.GAMING,
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, prevTimeSchedule]);

  // 게임 시간 타이머
  useEffect(() => {
    // 계산된 게임 시간이 0보다 적을 때 타이머를 진행하지 않음
    if (gameTimeLeft < 0) return;

    const interval = setInterval(() => {
      const gameTimeOffset = targetDate - Date.now();
      if (gameTimeOffset > 0) {
        setIsGaming(true);
        setGameTimeLeft(targetDate - Date.now());
      } else {
        setGameTimeLeft(0);
        setIsGaming(false);
        if (prevTimeSchedule === TimeSchedule.GAMING) {
          updateGameRound({
            ...gameRound,
            isGameInProgress: false,
            currentTimeSchedule: TimeSchedule.RESTTIME,
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, prevTimeSchedule]);

  // 쉬는 시간 타이머
  useEffect(() => {
    // 게임이 진행 중일 때 타이머를 진행하지 않음
    if (isGaming) return;

    const interval = setInterval(() => {
      const restTimeOffset = targetRestTime - Date.now();
      if (restTimeOffset > 0) {
        setRestTimeLeft(targetRestTime - Date.now());
      } else {
        setRestTimeLeft(0);
        setIsGaming(true);

        const tempAllRoundScore = player?.allRoundScore ? { ...player.allRoundScore } : {};
        if (gameRound.currentRoundName)
          tempAllRoundScore[gameRound.currentRoundName] = player?.thisRoundScore as number;

        // 쉬는 시간이 끝나면,
        // 재출동 페이지로 이동
        router.push(Page.WELCOME_BACK).then(() => {
          if (user)
            updatePlayer({
              documentId: user?.uid,
              updated: {
                score: tempAllRoundScore,
              },
            });
          assignPlayer({
            ...(player as Player),
            objectPath: undefined,
            allRoundScore: tempAllRoundScore,
          });
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isGaming]);

  useEffect(() => {
    if (isGaming) return;

    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "GetCurrentRoundBestOfPlayer",
      })
      .then((res) => {
        const thisRoundBestPlayerUID = res.data.PlayerUID;
        updateGameRound({
          ...gameRound,
          thisRoundBestPlayerUID,
        });

        if (player && thisRoundBestPlayerUID === player.uid) {
          updatePlayer({
            documentId: player.uid as string,
            updated: {
              gotFirstPlace: (player.gotFirstPlace || 0) + 1,
            },
          });
          assignPlayer({
            ...(player as Player),
            gotFirstPlace: (player?.gotFirstPlace || 0) + 1,
          });
        }
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status,
          errorMessage: `"GetCurrentRoundBestOfPlayer" 함수에서 다음 에러 발생: ${error.response?.data.errorMessage}`,
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
  }, [isGaming]);

  const displayTimer = useCallback(() => {
    switch (gameRound.currentTimeSchedule) {
      case TimeSchedule.COUNTDOWN: {
        return `게임 시작까지 ${
          countDownLeft.toString().substring(0, countDownLeft.toString().length - 3) || 0
        }초 남음`;
      }
      case TimeSchedule.GAMING: {
        return `게임 시간이 ${
          gameTimeLeft.toString().substring(0, gameTimeLeft.toString().length - 3) || 0
        }초 남음`;
      }
      case TimeSchedule.RESTTIME: {
        return `쉬는 시간이 ${
          restTimeLeft.toString().substring(0, restTimeLeft.toString().length - 3) || 0
        }초 남음`;
      }
      default:
        break;
    }
  }, [countDownLeft, gameRound.currentTimeSchedule, gameTimeLeft, restTimeLeft]);

  return <div>{displayTimer()}</div>;
}
