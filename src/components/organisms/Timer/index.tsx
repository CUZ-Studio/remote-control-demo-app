import { useEffect, useMemo } from "react";
import axios from "axios";

import useCountdown from "@/hooks/useCountdown";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";

import { Container } from "./styles";

export default function Timer() {
  const player = usePlayer();
  const gameRound = useGameRound();
  const { assignPlayer, updateGameRound } = useGameActions();

  const targetDate = useMemo(() => {
    return gameRound.timeLeft * 1000 + new Date().getTime();
    // 플레이어 상대경로가 변화할 때마다 새로운 라운드가 시작했다는 의미이므로,
    // 남은 시간을 다시 계산해줘야 함
  }, [gameRound?.timeLeft, player?.objectPath]);

  const [minutes, seconds] = useCountdown(targetDate);

  useEffect(() => {
    if (minutes + seconds <= 0) {
      setTimeout(() => {
        axios
          .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
            objectPath: "/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_GameModeBase_C_0",
            functionName: "BindingCharacter",
            generateTransaction: true,
          })
          .then((res) => {
            assignPlayer({
              ...player,
              objectPath: res.data.CharacterPath,
            });
            updateGameRound({
              ...gameRound,
              isPlaying: true,
              timeLeft: res.data.MainGameRemainTime,
            });
          });
      }, 2000);
    }
  }, [minutes, seconds]);

  return (
    <Container>
      <span>{minutes}분 </span>
      <span>{seconds}초</span>
    </Container>
  );
}
