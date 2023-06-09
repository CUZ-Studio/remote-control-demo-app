import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { assignPlayer } from "@/slices/game";

export default function useGameActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ assignPlayer }, dispatch), [dispatch]);
}
