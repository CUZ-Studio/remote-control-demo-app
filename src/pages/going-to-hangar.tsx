import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import { updatePlayer } from "@/firebase/players";
import usePlayer from "@/hooks/usePlayer";
import { Page } from "@/types";

import { Container, LoadingMessage } from "@/styles/going-to-hangar";

export default function GoingToHangar() {
  const router = useRouter();
  const player = usePlayer();

  useEffect(() => {
    if (_.isNil(player)) return;
    if (!player?.objectPath) return;

    try {
      // 플레이어를 화면 중앙에 위치하게 하기
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: player.objectPath,
          functionName: "SetPlayerLocation",
          generateTransaction: true,
        })
        .then(() => {
          updatePlayer({
            documentId: player.uid,
            updated: {
              playedNum: player.playedNum ? player.playedNum + 1 : 1,
            },
          });
          router.push(Page.PLAY);
        });
    } catch (error) {
      toast.error("캐릭터를 나타낼 수 없습니다");
    }
  }, [player]);
  return (
    <Container>
      <LoadingMessage>{`로봇 격납고로\n보내는 중`}</LoadingMessage>
    </Container>
  );
}
