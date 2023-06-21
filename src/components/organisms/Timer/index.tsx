import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";

export default function Countdown() {
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

  useEffect(() => {
    if (gameTimeLeft < 0) return;
    const interval = setInterval(() => {
      const offset = targetDate - Date.now();
      if (offset > 0) {
        setGameTimeLeft(targetDate - Date.now());
        updateGameRound({
          ...gameRound,
          isGameInProgress: true,
        });
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

  useEffect(() => {
    if (isGaming) return;

    const interval = setInterval(() => {
      const offset = targetRestTime - Date.now();
      if (offset > 0) {
        setRestTimeLeft(targetRestTime - Date.now());
        updateGameRound({
          ...gameRound,
          isGameInProgress: false,
        });
      } else {
        setRestTimeLeft(0);
        setIsGaming(true);

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
            // 캐릭터 생성 성공시 오브젝트 상대 경로 업데이트
            assignPlayer({
              ...player,
              objectPath: res.data.CharacterPath,
            });
            // 생성된 캐릭터가 게임 화면 중심에 나타나게 하기
            axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
              objectPath: res.data.CharacterPath,
              functionName: "SetPlayerLocation",
              generateTransaction: true,
            });
            // 게임 남은 시간, 게임진행여부 상태 업데이트
            updateGameRound({
              ...gameRound,
              isGameInProgress: true,
              timeLeft: res.data.MainGameRemainTime,
            });
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isGaming]);

  return <div>{isGaming ? `게임 시간: ${gameTimeLeft}` : `쉬는 시간: ${restTimeLeft}`}</div>;
}
