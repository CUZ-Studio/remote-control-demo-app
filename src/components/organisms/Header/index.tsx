import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";

import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";
import noticeToSWIT from "@/utils/noticeToSWIT";

import Timer from "../Timer";
import {
  ArrowBackIcon,
  IconWrapper,
  Inner,
  LogoutIcon,
  ProfileBox,
  ProfileImage,
  ProfileImageWrapper,
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
      case Page.PLAY:
        return false;
      case Page.START_YOUR_JOURNEY:
      default:
        return true;
    }
  })();

  const showLogoutOnHeader = (() => {
    switch (router.asPath) {
      case Page.START_YOUR_JOURNEY:
        return true;
      default:
        return false;
    }
  })();

  const isVisible = (() => {
    switch (router.asPath) {
      case Page.HOME:
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
        return Page.SELECT_MODEL;
      default:
        return Page.START_YOUR_JOURNEY;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error) => {
          noticeToSWIT({
            isUrgent: true,
            errorName: error.name,
            errorCode: error.response?.status,
            errorMessage: `"SetPlayerDefaultLocation" 함수에서 다음 에러 발생: ${error.response?.data.errorMessage}`,
          });
        });
    }
  };
  return (
    <Root showUserOnHeader={showUserOnHeader} isVisible={isVisible}>
      <Inner isMobile={isMobile}>
        {showUserOnHeader ? (
          <ProfileBox>
            {user?.image ? (
              <ProfileImageWrapper>
                <Image width={47} height={47} src={user.image} alt={user.displayName} />
              </ProfileImageWrapper>
            ) : (
              <ProfileImage />
            )}
            <UserName>{user?.displayName}</UserName>
          </ProfileBox>
        ) : (
          <ArrowBackIcon onClick={() => router.push(getPreviousPage)}>
            <Image width={24} height={24} src="/assets/icons/arrowBack.svg" alt="Back" />
          </ArrowBackIcon>
        )}
        {router.asPath === Page.PLAY && <Timer />}
        {showLogoutOnHeader && (
          <IconWrapper>
            <LogoutIcon onClick={logout} />
          </IconWrapper>
        )}
      </Inner>
    </Root>
  );
}
