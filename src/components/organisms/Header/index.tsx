import { useRouter } from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

import Timer from "@/components/organisms/Timer";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";

import { Inner, LogoutIcon, Root } from "./styles";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameRound();

  const { authorize } = useAuthActions();
  const { assignPlayer, updateGameRound } = useGameActions();

  const logout = async () => {
    window.Furo.logout();
    authorize(null);
    router.push(Page.HOME);

    if (player) {
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: player.objectPath,
          functionName: "SetPlayerDefaultLocation",
          generateTransaction: true,
        })
        .then(() => {
          assignPlayer(null);
          updateGameRound({
            ...gameRound,
            timeLeft: 0,
            isPlaying: false,
          });
        })
        .catch(() => toast.error("와하!"));
    }
  };
  return (
    <Root>
      <Inner isMobile={isMobile}>
        {user?.displayName}님, 반가워요♡
        <Timer />
        <LogoutIcon onClick={logout} />
      </Inner>
    </Root>
  );
}
