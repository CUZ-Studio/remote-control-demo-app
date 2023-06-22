import { MouseEvent, MouseEventHandler } from "react";
import Image from "next/image";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import { FireButton, JumpButton, MoveLeftButton, MoveRightButton, Panel } from "./styles";

export default function ControlPanel() {
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

  const onJump: MouseEventHandler = async (e) => {
    e.preventDefault();

    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "OnJump",
    });
  };

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
      setTimeout(() => {
        getScore().then((res) => {
          assignPlayer({
            ...player,
            score: res.data.PlayerScore,
          });
        });
      }, 500);
    });
  };

  return (
    <Panel>
      <JumpButton onClick={onJump}>
        <Image src="/assets/icons/arrowUp.svg" alt="arrow up" width={88} height={40} />
      </JumpButton>
      <MoveLeftButton onClick={(e) => handleBackward(e, 1)}>
        <Image src="/assets/icons/arrowLeft.svg" alt="arrow left" width={40} height={97} />
      </MoveLeftButton>
      <MoveRightButton onClick={(e) => handleForward(e, 1)}>
        <Image src="/assets/icons/arrowLeft.svg" alt="arrow right" width={40} height={97} />
      </MoveRightButton>
      <FireButton onClick={handleFire}>
        <Image src="/assets/icons/fire.svg" alt="fire" width={44} height={44} />
      </FireButton>
    </Panel>
  );
}
