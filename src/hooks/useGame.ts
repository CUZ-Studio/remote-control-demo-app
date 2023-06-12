import { useSelector } from "react-redux";

import { RootState } from "@/slices/store";

export default function useGame() {
  return useSelector((state: RootState) => state.game.gameStatus);
}
