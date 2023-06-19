import useGameStatus from "@/hooks/useGameRound";

import { StatusBar } from "./styles";

export default function GameStatusBar() {
  const gameRound = useGameStatus();
  return <StatusBar>{gameRound.isGameInProgress ? "게임진행중" : "게임쉬는중"}</StatusBar>;
}
