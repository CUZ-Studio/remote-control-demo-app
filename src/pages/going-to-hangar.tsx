import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import { Developer, Page, Slack_Developer_User_ID } from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";

import { Container, LoadingMessage } from "@/styles/going-to-hangar";

export default function GoingToHangar() {
  const router = useRouter();
  const player = usePlayer();
  const gameRound = useGameStatus();
  const { updateGameRound, assignPlayer } = useGameActions();

  useEffect(() => {
    if (_.isNil(player)) return;

    // 현재 진행중인 게임 라운드 정보 요청하기
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "GetCurrentRoundName",
        generateTransaction: true,
      })
      .then((res) => {
        const currentRoundName = res.data.CurrentRoundName;

        // 게임 진행 여부 true로 업데이트
        updateGameRound({
          ...gameRound,
          isGameInProgress: true,
          currentRoundName,
        });
      })
      .catch((error) => {
        const notice = {
          errorName: error.name,
          errorCode: error.response?.status,
          errorMessage: `"GetCurrentRoundName" 함수에서 다음 에러 발생: ${error.response?.data.errorMessage}`,
        };
        noticeToSlack({
          ...notice,
          assignees: [Slack_Developer_User_ID.GODA, Slack_Developer_User_ID.GUNI],
        });
        noticeToSWIT({
          ...notice,
          assignees: [Developer.GODA, Developer.GUNI],
        });
      });
    // firebase 데이터베이스에 출동횟수 + 1한 값으로 업데이트
    if (player.uid)
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

    router.push(Page.PLAY);
  }, []);
  return (
    <Container>
      <LoadingMessage>{`로봇 격납고로\n보내는 중`}</LoadingMessage>
    </Container>
  );
}
