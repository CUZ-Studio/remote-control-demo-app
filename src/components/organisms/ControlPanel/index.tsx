import { MouseEventHandler, TouchEventHandler, useCallback, useState } from "react";
import axios from "axios";
import _ from "lodash";

import FireIcon from "@/components/atoms/Keys/Fire";
import JumpIcon from "@/components/atoms/Keys/Jump";
import LeftIcon from "@/components/atoms/Keys/Left";
import RightIcon from "@/components/atoms/Keys/Right";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import { Player } from "@/slices/game";
import {
  ControlPanelEvent,
  Slack_Developer_User_ID,
  Swit_Developer_User_ID,
  TimeSchedule,
} from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";

import { FireButton, JumpButton, MoveLeftButton, MoveRightButton, Panel, Paper } from "./styles";

export default function ControlPanel() {
  const [isMouseHolding, setIsMouseHolding] = useState(false);
  const [controlEvent, setControlEvent] = useState<ControlPanelEvent>();

  const player = usePlayer();
  const gameRound = useGameStatus();
  const { assignPlayer } = useGameActions();

  const handleMouseDown = (eventType: ControlPanelEvent) => {
    setControlEvent(eventType);
    setIsMouseHolding(true);
  };

  const handleMouseUp = () => {
    setControlEvent(undefined);
    setIsMouseHolding(false);
  };

  const handleJump = async () => {
    if (_.isNil(player?.objectPath)) return;
    if (!gameRound.isGameInProgress) return;

    return await axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: player?.objectPath,
        functionName: "OnJump",
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status || error.code,
          errorMessage: `"OnJump" 함수에서 다음 에러 발생: ${
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
  };

  const makeJumpApiRequestThrottled = useCallback(
    _.throttle(() => handleJump(), 500),
    [player, gameRound],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onJump: MouseEventHandler | TouchEventHandler = (e: any) => {
    e.preventDefault();

    handleMouseDown(ControlPanelEvent.JUMP);
    makeJumpApiRequestThrottled();
  };

  const onFire = async () => {
    if (_.isNil(player?.objectPath)) return;

    return await axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: player?.objectPath,
        functionName: "OnFire",
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status || error.code,
          errorMessage: `"OnFire" 함수에서 다음 에러 발생: ${
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
  };

  const getScore = async () => {
    if (_.isNil(player?.objectPath)) return;

    return await axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: player?.objectPath,
        functionName: "GetPlayerScore",
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status || error.code,
          errorMessage: `"GetPlayerScore" 함수에서 다음 에러 발생: ${
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
  };

  const handleFire = () => {
    if (!gameRound.isGameInProgress) return;

    onFire().then(() => {
      // 발사 이후 점수가 업데이트되기까지 약간의 지연시간이 소요되므로,
      // 0.5초 뒤에 점수 요청 및 전역 상태 업데이트
      setTimeout(() => {
        getScore().then((res) => {
          if (!res) return;
          assignPlayer({
            ...(player as Player),
            thisRoundScore: res.data.PlayerScore,
          });
        });
      }, 500);
    });
  };

  const makeFireAndGetScoreApiRequestThrottled = useCallback(
    _.throttle(() => handleFire(), 500),
    [player, gameRound],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFireAndGetScore: MouseEventHandler | TouchEventHandler = (e: any) => {
    e.preventDefault();

    handleMouseDown(ControlPanelEvent.FIRE);
    makeFireAndGetScoreApiRequestThrottled();
  };

  const moveLeft = async () => {
    try {
      if (_.isNil(player?.objectPath)) return;
      if (!gameRound.isGameInProgress) return;

      await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: player?.objectPath,
        functionName: "SetMoveForwardLeft",
        generateTransaction: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const notice = {
        errorName: error.name,
        errorCode: error.response?.status || error.code,
        errorMessage: `"SetMoveForwardLeft" 함수에서 다음 에러 발생: ${
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
    }
  };

  const makeMoveLeftApiRequestThrottled = useCallback(
    _.throttle(() => {
      moveLeft();
    }, 500),
    [player, gameRound],
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMoveLeft: MouseEventHandler | TouchEventHandler = (e: any) => {
    e.preventDefault();

    handleMouseDown(ControlPanelEvent.MOVE_LEFT);
    makeMoveLeftApiRequestThrottled();
  };

  const moveRight = async () => {
    try {
      if (_.isNil(player?.objectPath)) return;
      if (!gameRound.isGameInProgress) return;

      await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: player?.objectPath,
        functionName: "SetMoveForwardRight",
        generateTransaction: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const notice = {
        errorName: error.name,
        errorCode: error.response?.status || error.code,
        errorMessage: `"SetMoveForwardRight" 함수에서 다음 에러 발생: ${
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
    }
  };

  const makeMoveRightApiRequestThrottled = useCallback(
    _.throttle(() => moveRight(), 500),
    [player, gameRound],
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMoveRight: MouseEventHandler | TouchEventHandler = (e: any) => {
    e.preventDefault();

    handleMouseDown(ControlPanelEvent.MOVE_RIGHT);
    makeMoveRightApiRequestThrottled();
  };

  return (
    <Panel>
      <Paper
        isGameInProgress={
          gameRound.isGameInProgress && gameRound.currentTimeSchedule === TimeSchedule.GAMING
        }
      />
      <JumpButton
        onMouseDown={onJump as MouseEventHandler}
        onMouseUp={handleMouseUp}
        onTouchStart={onJump as TouchEventHandler}
        onTouchEnd={handleMouseUp}
      >
        <JumpIcon
          isPressed={
            controlEvent === ControlPanelEvent.JUMP && isMouseHolding && gameRound.isGameInProgress
          }
        />
      </JumpButton>
      <MoveLeftButton
        onMouseDown={onMoveLeft as MouseEventHandler}
        onMouseUp={handleMouseUp}
        onTouchStart={onMoveLeft as TouchEventHandler}
        onTouchEnd={handleMouseUp}
      >
        <LeftIcon
          isPressed={
            controlEvent === ControlPanelEvent.MOVE_LEFT &&
            isMouseHolding &&
            gameRound.isGameInProgress
          }
        />
      </MoveLeftButton>
      <MoveRightButton
        onMouseDown={onMoveRight as MouseEventHandler}
        onMouseUp={handleMouseUp}
        onTouchStart={onMoveRight as TouchEventHandler}
        onTouchEnd={handleMouseUp}
      >
        <RightIcon
          isPressed={
            controlEvent === ControlPanelEvent.MOVE_RIGHT &&
            isMouseHolding &&
            gameRound.isGameInProgress
          }
        />
      </MoveRightButton>
      <FireButton
        onMouseDown={onFireAndGetScore as MouseEventHandler}
        onMouseUp={handleMouseUp}
        onTouchStart={onFireAndGetScore as TouchEventHandler}
        onTouchEnd={handleMouseUp}
      >
        <FireIcon
          isPressed={
            controlEvent === ControlPanelEvent.FIRE && isMouseHolding && gameRound.isGameInProgress
          }
        />
      </FireButton>
    </Panel>
  );
}
