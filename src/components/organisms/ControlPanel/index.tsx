import { MouseEvent, MouseEventHandler, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import Arrow from "@/components/atoms/Arrow";
import Fire from "@/components/atoms/Fire";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ControlPanelEvent, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import { FireButton, JumpButton, MoveLeftButton, MoveRightButton, Panel } from "./styles";

export default function ControlPanel() {
  const [isMouseHolding, setIsMouseHolding] = useState(false);
  const [controlEvent, setControlEvent] = useState<ControlPanelEvent>();

  const user = useUser();
  const player = usePlayer();
  const { assignPlayer } = useGameActions();

  const moveForward = async (val: 0 | 1 | -1) => {
    if (_.isNil(player)) return;
    if (_.isNil(user)) return;

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "MoveForward",
        propertyValue: {
          MoveForward: val,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
  };

  const handleForward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(-1);

    setTimeout(async () => {
      await moveForward(0);
    }, 1500 * sec);
  };

  const handleBackward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(1);

    setTimeout(async () => {
      await moveForward(0);
    }, 1500 * sec);
  };

  const handleMouseDown = (eventType: ControlPanelEvent) => {
    setControlEvent(eventType);
    setIsMouseHolding(true);
  };

  const handleMouseUp = () => {
    setControlEvent(undefined);
    setIsMouseHolding(false);
  };

  const onJump: MouseEventHandler = async () =>
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "OnJump",
    });

  const onFire = async () =>
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "OnFire",
    });

  const getScore = async () =>
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "GetPlayerScore",
    });

  const handleFire = (e: MouseEvent) => {
    e.preventDefault();

    onFire().then(() => {
      // 발사 이후 점수가 업데이트되기까지 약간의 지연시간이 소요되므로,
      // 0.5초 뒤에 점수 요청 및 전역 상태 업데이트
      setTimeout(() => {
        getScore().then((res) => {
          assignPlayer({
            ...player,
            thisRoundScore: res.data.PlayerScore,
          });
        });
      }, 500);
    });
  };

  return (
    <Panel>
      <JumpButton
        onClick={onJump}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.JUMP)}
        onMouseUp={handleMouseUp}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.JUMP && isMouseHolding} />
      </JumpButton>
      <MoveLeftButton
        onClick={(e) => handleBackward(e, 1)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_LEFT)}
        onMouseUp={handleMouseUp}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_LEFT && isMouseHolding} />
      </MoveLeftButton>
      <MoveRightButton
        onClick={(e) => handleForward(e, 1)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_RIGHT)}
        onMouseUp={handleMouseUp}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_RIGHT && isMouseHolding} />
      </MoveRightButton>
      <FireButton
        onClick={handleFire}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.FIRE)}
        onMouseUp={handleMouseUp}
      >
        <Fire isPressed={controlEvent === ControlPanelEvent.FIRE && isMouseHolding} />
      </FireButton>
    </Panel>
  );
}
