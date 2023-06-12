import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { assignPlayer, updateGameStatus } from "@/slices/game";

export default function useGameActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({ assignPlayer, updateGameStatus }, dispatch),
    [dispatch],
  );
}
