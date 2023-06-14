import { useSelector } from "react-redux";

import { RootState } from "@/slices/store";

export default function useGameStatus() {
  return useSelector((state: RootState) => state.game.gameRound);
}
