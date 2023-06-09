import { MouseEventHandler, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import ControlPanel from "@/components/organisms/ControlPanel";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { assignPlayer } from "@/slices/game";
import wrapper from "@/slices/store";
import { ButtonShape, Page, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import { Container, PlayerInfoBox } from "@/styles/play.styles";

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();

  const { assignPlayer } = useGameActions();

  const updateDisplayName: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!user) {
      router.replace(Page.HOME);
      return;
    }

    const uuid = uuidv4();
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: player.objectPath,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "HeadTag",
        propertyValue: {
          HeadTag: `@${user.username}___${uuid}`,
        },
      })
      .then(() => {
        assignPlayer({
          ...player,
          displayName: `@${user.username}___${uuid}`,
        });
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };

  useEffect(() => {
    if (_.isNil(user)) router.replace(Page.HOME);
  }, [user]);

  return (
    <Container>
      {player && (
        <PlayerInfoBox>
          <h3>플레이어 정보</h3>
          <p>objectPath: {player.objectPath}</p>
          <p>
            HeadTag: {player.displayName ? player.displayName : "랜덤 ID 배정받기를 눌러주세요"}
          </p>
        </PlayerInfoBox>
      )}
      <BasicButton type="button" shape={ButtonShape.RECTANGLE} onClick={updateDisplayName}>
        플레이어 랜덤 ID 배정받기
      </BasicButton>
      <ControlPanel />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store) => async (context) => {
    // 20개의 Player에 대해 lock 정보 불러오기
    const requestIds = Array.from({ length: 20 }).map((_, i) => i);
    const multipleRequests = requestIds.reduce((acc, cur) => {
      acc = acc.concat(
        axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
          objectPath: `/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_Player_C_${cur}`,
          access: REMOTE_CONTROL_API_ACCESS_TYPE.READ_ACCESS,
          propertyName: "Lock",
        }),
      );
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, [] as Promise<AxiosResponse<any, any>>[]);

    const res = await Promise.allSettled(multipleRequests);

    const availableIdx = res.findIndex(
      (singleResponse) => singleResponse.status === "fulfilled" && !singleResponse.value.data.Lock,
    );

    if (availableIdx > -1) {
      store.dispatch(
        assignPlayer({
          objectPath: `/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_Player_C_${availableIdx}`,
          displayName: "",
        }),
      );

      axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: `/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_Player_C_${availableIdx}`,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.WRITE_TRANSACTION_ACCESS,
        propertyName: "Lock",
        propertyValue: {
          Lock: true,
        },
      });
    }

    // 할당 가능한 경우 object Path 설정
    // 할당 불가한 경우 현재 게임에 참여할 수 없는 boolean값 넘기기
    return {
      props: {},
    };
  },
);
