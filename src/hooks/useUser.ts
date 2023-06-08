import { useSelector } from "react-redux";

import { RootState } from "@/slices/store";

export default function useUser() {
  return useSelector((state: RootState) => state.auth.user);
}
