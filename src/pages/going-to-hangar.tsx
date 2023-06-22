import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Page } from "@/types";

import { Container, LoadingMessage } from "@/styles/going-to-hangar";

export default function GoingToHangar() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameStatus();
  const { updateGameRound, assignPlayer } = useGameActions();

  useEffect(() => {
    if (_.isNil(player)) return;

    let objectPath;
    if (!player?.objectPath) {
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: gameRound.gameModeBaseObjectPath,
          functionName: "BindingCharacter",
          parameters: {
            Model: player.model,
            Color: player.color,
            Name: player.headTag,
            UID: user.uid,
          },
          generateTransaction: true,
        })
        .then((res) => {
          const createdCharacterInfo = res.data;
          objectPath = createdCharacterInfo.CharacterPath;
        });
    }

    try {
      // 플레이어를 화면 중앙에 위치하게 하기
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: player.objectPath || objectPath,
          functionName: "SetPlayerLocation",
          generateTransaction: true,
        })
        .then(() => {
          // firebase 데이터베이스에 출동횟수 + 1한 값으로 업데이트
          updatePlayer({
            documentId: player.uid,
            updated: {
              playedNum: player.playedNum ? player.playedNum + 1 : 1,
            },
          });
          // 전역 상태에 출동회수 +1한 값으로 업데이트
          assignPlayer({
            ...player,
            playedNum: player.playedNum ? player.playedNum + 1 : 1,
          });
          // 게임 진행 여부 true로 업데이트
          updateGameRound({
            ...gameRound,
            isGameInProgress: true,
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
