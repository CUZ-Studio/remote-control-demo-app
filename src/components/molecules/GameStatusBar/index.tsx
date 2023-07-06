import useGameStatus from "@/hooks/useGameRound";
import { TimeSchedule } from "@/types";

import { StatusBar } from "./styles";

export default function GameStatusBar() {
  const { isGameInProgress, currentTimeSchedule } = useGameStatus();
  const isActive = isGameInProgress && currentTimeSchedule === TimeSchedule.GAMING;
  return (
    <StatusBar isActive={isActive}>{isActive ? "미션수행중" : "곧 미션이 시작됩니다!"}</StatusBar>
  );
}
