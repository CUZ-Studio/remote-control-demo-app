import { MouseEvent, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import BasicButton from "@/components/atoms/BasicButton";
import { getPlayer, updatePlayer } from "@/firebase/players";
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

  const moveForward = async (val: 0 | 1 | -1, isInit: boolean) => {
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

      if (val !== 0 && !isInit) {
        await updatePlayer({
          documentId: player.id,
          updated: {
            displayName: player.displayName,
            status: {
              moveForward: player.moveForward ? player.moveForward + val : val,
            },
            userId: user.username,
          },
        });

        assignPlayer({
          ...player,
          moveForward: player.moveForward ? player.moveForward + val : val,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
  };
  const handleForward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(-1, false);

    setTimeout(async () => {
      await moveForward(0, false);
    }, 1000 * sec);
  };
  const handleBackward = async (e: MouseEvent, sec: number) => {
    e.preventDefault();

    await moveForward(1, false);

    setTimeout(async () => {
      await moveForward(0, false);
    }, 1000 * sec);
  };

  useEffect(() => {
    if (_.isNil(user)) return;

    getPlayer(user.username).then(async (res) => {
      const moveForwardVal = res[0].status.moveForward;
      if (moveForwardVal === 0) return;
      await moveForward(moveForwardVal < 0 ? -1 : 1, true);

      setTimeout(async () => {
        await moveForward(0, true);
      }, 1000 * Math.abs(moveForwardVal));
    });
  }, []);

  return (
    <Panel>
      <ForwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={(e) => handleForward(e, 1)}>
          <ForwardIcon />
        </BasicButton>
      </ForwardButtonWrapper>
      <BackwardButtonWrapper>
        <BasicButton type="button" shape={ButtonShape.CIRCLE} onClick={(e) => handleBackward(e, 1)}>
          <BackwardIcon />
        </BasicButton>
      </BackwardButtonWrapper>
    </Panel>
  );
}
