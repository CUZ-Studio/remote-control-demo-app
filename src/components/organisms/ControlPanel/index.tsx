import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import Arrow from "@/components/atoms/Arrow";
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

  const handleForward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(-1);

    setTimeout(async () => {
      await moveForward(0);
    }, 1000 * sec);
  };

  const handleBackward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(1);

    setTimeout(async () => {
      await moveForward(0);
    }, 1000 * sec);
  };

  const handleMouseDown = (eventType: ControlPanelEvent) => {
    setControlEvent(eventType);
    setIsMouseHolding(true);
  };

  const handleMouseUpForMovement = () => {
    moveForward(0);

    clearInterval(timer);
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
          console.log(res.data);
          assignPlayer({
            ...player,
            thisRoundScore: res.data.playerScore,
          });
        });
      }, 2000);
    });
  };

  const repeat = (callback: () => void) => {
    timer = setInterval(callback, 1000);
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
        default:
          break;
      }
    } else {
      switch (controlEvent) {
        case ControlPanelEvent.MOVE_LEFT:
        case ControlPanelEvent.MOVE_RIGHT:
          {
            handleMouseUpForMovement();
          }
          break;
        default:
          break;
      }
    }
  }, [isMouseHolding, controlEvent]);

  return (
    <Panel>
      <JumpButton onClick={onJump}>
        <Image src="/assets/icons/arrowUp.svg" alt="arrow up" width={88} height={40} />
      </JumpButton>
      <MoveLeftButton onClick={(e) => handleBackward(e, 1)}>
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_LEFT && isMouseHolding} />
      </MoveLeftButton>
      <MoveRightButton onClick={(e) => handleForward(e, 1)}>
        <Arrow isPressed={controlEvent === ControlPanelEvent.MOVE_RIGHT && isMouseHolding} />
      </MoveRightButton>
      <FireButton onClick={handleFire}>
        <Image src="/assets/icons/fire.svg" alt="fire" width={44} height={44} />
      </FireButton>
    </Panel>
  );
}
