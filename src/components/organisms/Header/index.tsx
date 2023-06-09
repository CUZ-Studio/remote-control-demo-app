import { useRouter } from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";

import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import { Inner, LogoutIcon, Root } from "./styles";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();

  const { authorize } = useAuthActions();
  const { assignPlayer } = useGameActions();

  const logout = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: `${player.objectPath}`,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "bIsLock",
        propertyValue: {
          bIsLock: false,
        },
      })
      .then(() => {
        authorize(null);
        assignPlayer(null);
        router.replace(Page.HOME);
      });
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
