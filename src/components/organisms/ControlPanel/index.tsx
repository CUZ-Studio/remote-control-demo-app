import { TouchEventHandler } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import BasicButton from "@/components/atoms/BasicButton";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import {
  BackwardButtonWrapper,
  BackwardIcon,
  ForwardButtonWrapper,
  ForwardIcon,
  LeftButtonWrapper,
  LeftIcon,
  Panel,
  RightButtonWrapper,
  RightIcon,
} from "./styles";

export default function ControlPanel() {
  const player = usePlayer();

  const moveForward: TouchEventHandler = (e) => {
    e.preventDefault();
    if (_.isNil(player)) return;

    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "MoveForward",
        propertyValue: {
          MoveForward: 1,
        },
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };
  const stopMovement: TouchEventHandler = (e) => {
    e.preventDefault();
    if (_.isNil(player)) return;

    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "MoveForward",
        propertyValue: {
          MoveForward: 0,
        },
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };

  return (
    <Panel>
      <ForwardButtonWrapper>
        <BasicButton
          type="button"
          shape={ButtonShape.CIRCLE}
          onTouchStart={moveForward}
          onTouchEnd={stopMovement}
        >
          <ForwardIcon />
        </BasicButton>
      </ForwardButtonWrapper>
      <BackwardButtonWrapper>
        <BasicButton type="button" disabled shape={ButtonShape.CIRCLE}>
          <BackwardIcon />
        </BasicButton>
      </BackwardButtonWrapper>
      <RightButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} disabled>
          <RightIcon />
        </BasicButton>
      </RightButtonWrapper>
      <LeftButtonWrapper>
        <BasicButton type="button" disabled shape={ButtonShape.CIRCLE}>
          <LeftIcon />
        </BasicButton>
      </LeftButtonWrapper>
    </Panel>
  );
}
