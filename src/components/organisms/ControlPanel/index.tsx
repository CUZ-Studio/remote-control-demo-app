import { MouseEvent, MouseEventHandler } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import BasicButton from "@/components/atoms/BasicButton";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import {
  BackwardButtonWrapper,
  BackwardIcon,
  ControlButton,
  ForwardButtonWrapper,
  ForwardIcon,
  Panel,
} from "./styles";

export default function ControlPanel() {
  const user = useUser();
  const player = usePlayer();

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
  const onFire = async () => {
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "OnFire",
    });
  };
  const onStopFire = async () => {
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "StopFire",
    });
  };
  const handleFire = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await onFire();

    setTimeout(async () => {
      await onStopFire();
    }, 1000 * sec);
  };
  const onFireMissile = async () => {
    await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
      objectPath: player.objectPath,
      functionName: "OnFireMissile",
    });
  };

  return (
    <Panel>
      <BackwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={(e) => handleBackward(e, 1)}>
          <BackwardIcon />
        </BasicButton>
      </BackwardButtonWrapper>
      <ForwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={(e) => handleForward(e, 1)}>
          <ForwardIcon />
        </BasicButton>
      </ForwardButtonWrapper>
      <ControlButton type="button" onClick={onJump}>
        점프
      </ControlButton>
      <ControlButton type="button" onClick={(e) => handleFire(e, 1)}>
        불
      </ControlButton>
      <ControlButton type="button" onClick={onFireMissile}>
        미사일
      </ControlButton>
    </Panel>
  );
}
