import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { authorize } from "@/slices/user";

export default function useAuthActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ authorize }, dispatch), [dispatch]);
}
