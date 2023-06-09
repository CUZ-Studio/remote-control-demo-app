import { MouseEventHandler } from "react";
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
  Panel,
} from "./styles";

export default function ControlPanel() {
  const player = usePlayer();

  const moveForward = (val: 0 | 1 | -1) => {
    if (_.isNil(player)) return;

    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "MoveForward",
        propertyValue: {
          MoveForward: val,
        },
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };
  const handleForward: MouseEventHandler = async (e) => {
    e.preventDefault();

    moveForward(-1);

    setTimeout(() => {
      moveForward(0);
    }, 1000);
  };
  const handleBackward: MouseEventHandler = async (e) => {
    e.preventDefault();

    moveForward(1);

    setTimeout(() => {
      moveForward(0);
    }, 1000);
  };

  return (
    <Panel>
      <ForwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={handleForward}>
          <ForwardIcon />
        </BasicButton>
      </ForwardButtonWrapper>
      <BackwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={handleBackward}>
          <BackwardIcon />
        </BasicButton>
      </BackwardButtonWrapper>
    </Panel>
  );
}
