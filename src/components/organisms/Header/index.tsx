import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";

import {
  ArrowBackIcon,
  IconWrapper,
  Inner,
  LogoutIcon,
  ProfileBox,
  ProfileImage,
  ProfileImageWrapper,
  QuestionMarkIcon,
  Root,
  UserName,
} from "./styles";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameRound();

  const { authorize } = useAuthActions();
  const { assignPlayer, updateGameRound } = useGameActions();

  const showUserOnHeader = (() => {
    switch (router.asPath) {
      case Page.WELCOME_BACK:
      case Page.SELECT_MODEL:
      case Page.CUSTOMIZE_DESIGN:
      case Page.NAME_YOUR_ROBOT:
      case Page.GOING_TO_HANGAR:
        return false;
      default:
        return true;
    }
  })();

  const getPreviousPage = (() => {
    switch (router.asPath) {
      case Page.NAME_YOUR_ROBOT:
        return Page.CUSTOMIZE_DESIGN;
      case Page.GOING_TO_HANGAR:
        return Page.NAME_YOUR_ROBOT;
      case Page.CUSTOMIZE_DESIGN:
      default:
        return Page.SELECT_MODEL;
    }
  })();

  const logout = async () => {
    window.Furo.logout();
    authorize(null);
    router.push(Page.HOME);

    if (player && player.objectPath) {
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
            isGameInProgress: false,
          });
        })
        .catch(() => toast.error("와하!"));
    }
  };
  return (
    <Root showUserOnHeader={showUserOnHeader}>
      <Inner isMobile={isMobile}>
        {showUserOnHeader ? (
          <ProfileBox>
            {user.image ? (
              <ProfileImageWrapper>
                <Image width={47} height={47} src={user.image} alt={user.displayName} />
              </ProfileImageWrapper>
            ) : (
              <ProfileImage />
            )}
            <UserName>{user.displayName}</UserName>
          </ProfileBox>
        ) : (
          <ArrowBackIcon onClick={() => router.push(getPreviousPage)}>
            <Image width={24} height={24} src="/assets/icons/arrowBack.svg" alt="Back" />
          </ArrowBackIcon>
        )}
        <IconWrapper>
          <LogoutIcon onClick={logout} />
          <QuestionMarkIcon>
            <Image width={22.75} height={22.75} src="/assets/icons/questionMark.svg" alt="Back" />
          </QuestionMarkIcon>
        </IconWrapper>
      </Inner>
    </Root>
  );
}
