import { useSelector } from "react-redux";

import { RootState } from "@/slices/store";

export default function usePlayer() {
  return useSelector((state: RootState) => state.auth.player);
}
