import useGameStatus from "@/hooks/useGameRound";

import { StatusBar } from "./styles";

export default function GameStatusBar() {
  const gameRound = useGameStatus();
  return (
    <StatusBar isActive={gameRound.isGameInProgress}>
      {gameRound.isGameInProgress ? "미션수행중" : "곧 미션이 시작됩니다!"}
    </StatusBar>
  );
}
