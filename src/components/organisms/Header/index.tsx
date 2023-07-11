import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";

import ArrowBackwardIcon from "@/components/atoms/Icons/Backward";
import LogoutIcon from "@/components/atoms/Icons/Logout";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page, Slack_Developer_User_ID, Swit_Developer_User_ID } from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";

import theme from "@/styles/theme";

import Timer from "../Timer";
import {
  ArrowBackIcon,
  Dot,
  IconWrapper,
  Indicator,
  Inner,
  ProfileBox,
  ProfileImage,
  ProfileImageWrapper,
  Root,
  Welcome,
} from "./styles";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameRound();

  const { authorize } = useAuthActions();
  const { assignPlayer, updateGameRound } = useGameActions();
  const clientId = router.query.clientId ? router.query.clientId.toString() : undefined;

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

  console.log(clientId);

  const showLogoutOnHeader = (() => {
    switch (router.asPath) {
      case Page.START_YOUR_JOURNEY:
      case Page.WELCOME_BACK:
      case Page.PLAY:
        return true;
      default:
        return false;
    }
  })();

  const logoutFill = (() => {
    switch (router.asPath) {
      case Page.START_YOUR_JOURNEY:
      case Page.WELCOME_BACK:
      case Page.PLAY:
        return "#C7D1E4";
      default:
        return theme.palette.grey[700];
    }
  })();

  const isVisible = (() => {
    if (clientId) return false;
    switch (router.asPath) {
      case Page.HOME:
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
          const notice = {
            isUrgent: true,
            errorName: error.name,
            errorCode: error.response?.status || error.code,
            errorMessage: `"SetPlayerDefaultLocation" 함수에서 다음 에러 발생: ${
              error?.message || error.response?.data.errorMessage
            }`,
          };
          noticeToSlack({
            ...notice,
            assignees: [Slack_Developer_User_ID.GODA, Slack_Developer_User_ID.GUNI],
          });
          noticeToSWIT({
            ...notice,
            assignees: [Swit_Developer_User_ID.GODA, Swit_Developer_User_ID.GUNI],
          });
        });
    }
  };

  const showStepIndicator = (() => {
    switch (router.asPath) {
      case Page.SELECT_MODEL:
      case Page.CUSTOMIZE_DESIGN:
      case Page.NAME_YOUR_ROBOT:
        return true;
      default:
        return false;
    }
  })();
  return (
    <Root showUserOnHeader={showUserOnHeader} isVisible={isVisible}>
      <Inner isMobile={isMobile} showUserOnHeader={showUserOnHeader}>
        {showUserOnHeader ? (
          <ProfileBox>
            {user?.image ? (
              <ProfileImageWrapper>
                <Image width={65} height={65} src={user.image} alt={user.displayName} />
              </ProfileImageWrapper>
            ) : (
              <ProfileImage />
            )}
          </ProfileBox>
        ) : (
          <ArrowBackIcon onClick={() => router.push(getPreviousPage)}>
            <ArrowBackwardIcon />
          </ArrowBackIcon>
        )}
        {router.asPath === Page.PLAY && <Timer />}
        {router.asPath === Page.WELCOME_BACK && <Welcome>Welcome Back!</Welcome>}
        {showStepIndicator && (
          <Indicator>
            <Dot
              isActive={router.asPath === Page.SELECT_MODEL}
              onClick={() => router.push(Page.SELECT_MODEL)}
            />
            <Dot
              isActive={router.asPath === Page.CUSTOMIZE_DESIGN}
              onClick={() => router.push(Page.CUSTOMIZE_DESIGN)}
            />
            <Dot
              isActive={router.asPath === Page.NAME_YOUR_ROBOT}
              onClick={() => router.push(Page.NAME_YOUR_ROBOT)}
            />
          </Indicator>
        )}
        {showLogoutOnHeader && (
          <IconWrapper onClick={logout}>
            <LogoutIcon fill={logoutFill} />
          </IconWrapper>
        )}
      </Inner>
    </Root>
  );
}
