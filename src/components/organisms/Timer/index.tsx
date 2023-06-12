import { useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useCountdown from "@/hooks/useCountdown";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameStatus";
import usePlayer from "@/hooks/usePlayer";

import { Container } from "./styles";

export default function Timer() {
  const player = usePlayer();
  const gameStatus = useGameStatus();
  const { assignPlayer, updateGameStatus } = useGameActions();

  const targetDate = useMemo(() => {
    return gameStatus.timeLeft * 1000 + new Date().getTime();
    // 플레이어 상대경로가 변화할 때마다 새로운 라운드가 시작했다는 의미이므로,
    // 남은 시간을 다시 계산해줘야 함
  }, [gameStatus?.timeLeft, player?.objectPath]);

  const [minutes, seconds] = useCountdown(targetDate);

  useEffect(() => {
    if (minutes + seconds <= 0) {
      setTimeout(async () => {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`,
            {
              objectPath: "/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_GameModeBase_C_0",
              functionName: "BindingCharacter",
              generateTransaction: true,
            },
          );

          assignPlayer({
            ...player,
            objectPath: res.data.CharacterPath,
          });
          updateGameStatus({
            isPlaying: true,
            timeLeft: res.data.MainGameRemainTime,
          });
        } catch (e) {
          toast.error("캐릭터를 불러올 수 없습니다");
        }
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
