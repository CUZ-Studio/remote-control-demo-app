import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";

export default function Countdown() {
  const router = useRouter();
  const gameRound = useGameStatus();

  const user = useUser();
  const player = usePlayer();
  const { assignPlayer, updateGameRound } = useGameActions();
  const [isGaming, setIsGaming] = useState(true);

  const targetDate = useMemo(() => {
    return gameRound.timeLeft * 1000 + new Date().getTime();
    // 플레이어 상대경로가 변화할 때마다 새로운 라운드가 시작했다는 의미이므로,
    // 남은 시간을 다시 계산해줘야 함
  }, [gameRound?.timeLeft, player?.objectPath]);
  const [gameTimeLeft, setGameTimeLeft] = useState(targetDate - Date.now());

  const targetRestTime = 10 * 1000 + new Date().getTime();
  const [restTimeLeft, setRestTimeLeft] = useState(targetRestTime - Date.now());

  // 게임 시간 타이머
  useEffect(() => {
    // 계산된 게임 시간이 0보다 적을 때 타이머를 진행하지 않음
    if (gameTimeLeft < 0) return;

    const interval = setInterval(() => {
      const gameTimeOffset = targetDate - Date.now();
      if (gameTimeOffset > 0) {
        setGameTimeLeft(targetDate - Date.now());
      } else {
        setGameTimeLeft(0);
        updateGameRound({
          ...gameRound,
          isGameInProgress: false,
        });
        setIsGaming(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

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

        // 쉬는 시간이 끝나면,
        // 재출동 페이지로 이동
        router.push(Page.WELCOME_BACK).then(() => {
          updatePlayer({
            documentId: user.uid,
            updated: {
              score: player.allRoundScore
                ? (player.allRoundScore || []).concat(player.thisRoundScore)
                : [player.thisRoundScore],
            },
          });
          assignPlayer({
            ...player,
            objectPath: undefined,
            allRoundScore: player.allRoundScore
              ? (player.allRoundScore || []).concat(player.thisRoundScore)
              : [player.thisRoundScore],
          });
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isGaming]);

  return (
    <div style={{ visibility: "hidden" }}>
      {isGaming
        ? `게임 시간: ${gameTimeLeft.toString().substring(0, gameTimeLeft.toString().length - 3)}초`
        : `쉬는 시간: ${restTimeLeft
            .toString()
            .substring(0, restTimeLeft.toString().length - 3)}초`}
    </div>
  );
}
