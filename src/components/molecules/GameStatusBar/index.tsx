import useGameStatus from "@/hooks/useGameRound";

import { StatusBar } from "./styles";

export default function GameStatusBar() {
  const { isGameInProgress } = useGameStatus();
  return (
    <StatusBar isActive={isGameInProgress}>
      {isGameInProgress ? "미션수행중" : "곧 미션이 시작됩니다!"}
    </StatusBar>
  );
}
