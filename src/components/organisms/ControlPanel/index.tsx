import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import Arrow from "@/components/atoms/Arrow";
import Fire from "@/components/atoms/Fire";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import { Player } from "@/slices/game";
import { ControlPanelEvent } from "@/types";

import { FireButton, JumpButton, MoveLeftButton, MoveRightButton, Panel } from "./styles";

let timer: NodeJS.Timeout;

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
    clearInterval(timer);
    setControlEvent(undefined);
    setIsMouseHolding(false);
  };

  const repeat = (callback: () => void) => {
    timer = setInterval(callback, 10);
  };

  const onJump: MouseEventHandler = async () => {
    if (_.isNil(player?.objectPath)) return;
    if (!gameRound.isGameInProgress) return;

    return await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player?.objectPath,
      functionName: "OnJump",
    });
  };

  const onFire = async () => {
    if (_.isNil(player?.objectPath)) return;

    return await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player?.objectPath,
      functionName: "OnFire",
    });
  };

  const getScore = async () => {
    if (_.isNil(player?.objectPath)) return;

    return await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player?.objectPath,
      functionName: "GetPlayerScore",
    });
  };

  const handleFire = (e: MouseEvent) => {
    e.preventDefault();
    if (!gameRound.isGameInProgress) return;

    onFire().then(() => {
      // 발사 이후 점수가 업데이트되기까지 약간의 지연시간이 소요되므로,
      // 0.5초 뒤에 점수 요청 및 전역 상태 업데이트
      setTimeout(() => {
        getScore().then((res) => {
          console.log(res?.data);
          if (_.isNil(res)) return;
          assignPlayer({
            ...(player as Player),
            thisRoundScore: res.data.playerScore,
          });
        });
      }, 500);
    });
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
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
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
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
  };

  useEffect(() => {
    if (!isMouseHolding) return;
    switch (controlEvent) {
      case ControlPanelEvent.MOVE_LEFT:
        {
          repeat(moveLeft);
        }

        break;
      case ControlPanelEvent.MOVE_RIGHT:
        {
          repeat(moveRight);
        }
        break;
      default:
        break;
    }
  }, [isMouseHolding, controlEvent, player?.objectPath]);

  return (
    <Panel>
      <JumpButton
        onClick={onJump}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.JUMP)}
        onMouseUp={handleMouseUp}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.JUMP)}
        onTouchEnd={handleMouseUp}
      >
        <Arrow
          isPressed={
            controlEvent === ControlPanelEvent.JUMP && isMouseHolding && gameRound.isGameInProgress
          }
        />
      </JumpButton>
      <MoveLeftButton
        onClick={moveLeft}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_LEFT)}
        onMouseUp={handleMouseUp}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.MOVE_LEFT)}
        onTouchEnd={handleMouseUp}
      >
        <Arrow
          isPressed={
            controlEvent === ControlPanelEvent.MOVE_LEFT &&
            isMouseHolding &&
            gameRound.isGameInProgress
          }
        />
      </MoveLeftButton>
      <MoveRightButton
        onClick={moveRight}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_RIGHT)}
        onMouseUp={handleMouseUp}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.MOVE_RIGHT)}
        onTouchEnd={handleMouseUp}
      >
        <Arrow
          isPressed={
            controlEvent === ControlPanelEvent.MOVE_RIGHT &&
            isMouseHolding &&
            gameRound.isGameInProgress
          }
        />
      </MoveRightButton>
      <FireButton
        onClick={handleFire}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.FIRE)}
        onMouseUp={handleMouseUp}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.FIRE)}
        onTouchEnd={handleMouseUp}
      >
        <Fire
          isPressed={
            controlEvent === ControlPanelEvent.FIRE && isMouseHolding && gameRound.isGameInProgress
          }
        />
      </FireButton>
    </Panel>
  );
}
