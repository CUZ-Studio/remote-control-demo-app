import { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import ControlPanel from "@/components/organisms/ControlPanel";
import Timer from "@/components/organisms/Timer";
import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import { Container, PlayerInfoBox } from "@/styles/play.styles";

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();

  const { assignPlayer } = useGameActions();

  const updateDisplayName: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      router.replace(Page.HOME);
      return;
    }

    const uuid = uuidv4();

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "HeadTag",
        propertyValue: {
          HeadTag: `@${user.username}___${uuid}`,
        },
      });

      await updatePlayer({
        documentId: player.id,
        updated: {
          displayName: `@${user.username}___${uuid}`,
          status: {
            moveForward: player.moveForward ?? 0,
          },
          userId: user.username,
        },
      });

      assignPlayer({
        ...player,
        displayName: `@${user.username}___${uuid}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "ERR_NETWORK") {
        toast.error("네트워크 연결을 확인하세요");
      }
    }
  };

  useEffect(() => {
    if (!player) return;

    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "bIsLock",
        propertyValue: {
          bIsLock: true,
        },
      })
      .then(() => {
        if (player.displayName) {
          axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
            objectPath: player.objectPath,
            access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
            propertyName: "HeadTag",
            propertyValue: {
              HeadTag: player.displayName,
            },
          });
        }
      });
  }, [player]);

  useEffect(() => {
    if (!user) router.push(Page.HOME);
  }, [user]);

  return (
    <Container>
      {player && (
        <>
          <Timer />
          <PlayerInfoBox>
            <h3>플레이어 랜덤 ID:</h3>
            <p>{player.displayName ? player.displayName : "랜덤 ID 배정받기를 눌러주세요"}</p>
          </PlayerInfoBox>
        </>
      )}
      <BasicButton type="button" shape={ButtonShape.RECTANGLE} onClick={updateDisplayName}>
        플레이어 랜덤 ID 배정받기
      </BasicButton>
      <ControlPanel />
    </Container>
  );
}
