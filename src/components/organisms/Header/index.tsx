import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

import useAuthActions from "@/hooks/useAuthActions";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";

import { Inner, LogoutIcon, Root } from "./styles";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const { authorize } = useAuthActions();

  const logout = () => {
    authorize(null);
    router.replace(Page.HOME);
  };
  return (
    <Root>
      <Inner isMobile={isMobile}>
        {user?.username}님, 반가워요♡
        <LogoutIcon onClick={logout} />
      </Inner>
    </Root>
  );
}
