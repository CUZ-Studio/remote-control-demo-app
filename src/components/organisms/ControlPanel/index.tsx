import { useEffect, useState } from "react";
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

let timer: NodeJS.Timeout;

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

  const onJump = async () =>
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

  const handleMouseDown = (eventType: ControlPanelEvent) => {
    setControlEvent(eventType);
    setIsMouseHolding(true);
  };
  const handleMouseUpForMovement = () => {
    moveForward(0);

    clearInterval(timer);
    setIsMouseHolding(false);
  };
  const handleMouseUpForFire = () => {
    getScore().then((res) => {
      assignPlayer({
        ...player,
        thisRoundScore: res.data.PlayerScore,
      });
    });

    clearInterval(timer);
    setIsMouseHolding(false);
  };
  const repeat = (callback: () => void) => {
    timer = setInterval(callback, 100);
  };

  useEffect(() => {
    if (isMouseHolding) {
      switch (controlEvent) {
        case ControlPanelEvent.MOVE_LEFT:
          {
            repeat(() => {
              moveForward(1);
            });
          }
          break;
        case ControlPanelEvent.MOVE_RIGHT:
          {
            repeat(() => {
              moveForward(-1);
            });
          }
          break;
        case ControlPanelEvent.FIRE:
          {
            repeat(() => {
              onFire();
            });
          }
          break;
        case ControlPanelEvent.JUMP:
          {
            repeat(() => {
              onJump();
            });
          }
          break;
        default:
          break;
      }
    } else {
      switch (controlEvent) {
        case ControlPanelEvent.MOVE_LEFT:
        case ControlPanelEvent.MOVE_RIGHT:
        case ControlPanelEvent.JUMP:
          {
            handleMouseUpForMovement();
          }
          break;
        case ControlPanelEvent.FIRE:
          {
            handleMouseUpForFire();
          }
          break;
        default:
          break;
      }
    }
  }, [isMouseHolding, controlEvent]);

  return (
    <Panel>
      <JumpButton
        onClick={() => setControlEvent(ControlPanelEvent.JUMP)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.JUMP)}
        onMouseUp={handleMouseUpForMovement}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.JUMP)}
        onTouchEnd={handleMouseUpForMovement}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.JUMP && isMouseHolding} />
      </JumpButton>
      <MoveLeftButton
        onClick={() => setControlEvent(ControlPanelEvent.MOVE_LEFT)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_LEFT)}
        onMouseUp={handleMouseUpForMovement}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.MOVE_LEFT)}
        onTouchEnd={handleMouseUpForMovement}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_LEFT && isMouseHolding} />
      </MoveLeftButton>
      <MoveRightButton
        onClick={() => setControlEvent(ControlPanelEvent.MOVE_RIGHT)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.MOVE_RIGHT)}
        onMouseUp={handleMouseUpForMovement}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.MOVE_RIGHT)}
        onTouchEnd={handleMouseUpForMovement}
      >
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_RIGHT && isMouseHolding} />
      </MoveRightButton>
      <FireButton
        onClick={() => setControlEvent(ControlPanelEvent.FIRE)}
        onMouseDown={() => handleMouseDown(ControlPanelEvent.FIRE)}
        onMouseUp={handleMouseUpForFire}
        onTouchStart={() => handleMouseDown(ControlPanelEvent.FIRE)}
        onTouchEnd={handleMouseUpForFire}
      >
        <Fire isPressed={controlEvent === ControlPanelEvent.FIRE && isMouseHolding} />
      </FireButton>
    </Panel>
  );
}
