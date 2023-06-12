import { useEffect, useMemo } from "react";
import axios from "axios";

import useCountdown from "@/hooks/useCountdown";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameStatus";
import usePlayer from "@/hooks/usePlayer";

export default function Timer() {
  const player = usePlayer();
  const gameStatus = useGameStatus();
  const { assignPlayer, updateGameStatus } = useGameActions();

  const targetDate = useMemo(() => {
    return gameStatus.timeLeft * 1000 + new Date().getTime();
  }, [gameStatus?.timeLeft]);

  const [minutes, seconds] = useCountdown(targetDate);

  useEffect(() => {
    if (minutes + seconds <= 0) {
      setTimeout(async () => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: "/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_GameModeBase_C_0",
          functionName: "BindingCharacter",
          generateTransaction: true,
        });

        assignPlayer({
          ...player,
          objectPath: res.data.CharacterPath,
        });
        updateGameStatus({
          isPlaying: true,
          timeLeft: res.data.MainGameRemainTime,
        });
      }, 2000);
    }
  }, [minutes, seconds]);

  return (
    <div>
      <span>{minutes} min </span>
      <span>{seconds} sec</span>
    </div>
  );
}
