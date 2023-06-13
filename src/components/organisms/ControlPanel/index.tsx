import { MouseEventHandler } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import BasicButton from "@/components/atoms/BasicButton";
import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import {
  BackwardButtonWrapper,
  BackwardIcon,
  ForwardButtonWrapper,
  ForwardIcon,
  Panel,
} from "./styles";

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

      if (val) {
        await updatePlayer({
          documentId: player.id,
          updated: {
            displayName: player.displayName,
            status: {
              moveForward: player.moveForward ? player.moveForward + val : 0 + val,
            },
            userId: user.username,
          },
        });

        assignPlayer({
          ...player,
          moveForward: player.moveForward ? player.moveForward + val : 0 + val,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
  };
  const handleForward: MouseEventHandler = async (e) => {
    e.preventDefault();

    await moveForward(-1);

    setTimeout(async () => {
      await moveForward(0);
    }, 1000);
  };
  const handleBackward: MouseEventHandler = async (e) => {
    e.preventDefault();

    await moveForward(1);

    setTimeout(async () => {
      await moveForward(0);
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
