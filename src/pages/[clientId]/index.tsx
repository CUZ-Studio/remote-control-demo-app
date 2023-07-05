import { useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

import { KAKAO_DEFAULT_PROFILE_IMAGE_URL } from "@/constants/url";
import { createPlayer, getPlayer } from "@/firebase/players";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import { Player } from "@/slices/game";
import { KaKaoLoginUser, Page } from "@/types";
import fetchImagesInFirebaseStorage from "@/utils/getImageUrl";

import { Container } from "@/styles/home.styles";

export default function HomePage() {
  const router = useRouter();
  const player = usePlayer();
  const gameRound = useGameRound();
  const { authorize } = useAuthActions();
  const { assignPlayer } = useGameActions();

  useEffect(() => {
    if (!gameRound.gameModeBaseObjectPath) return;

    window.Furo.init({
      // Your client id
      clientId: process.env.NEXT_PUBLIC_FURO_CLIENT_ID,
      // Your redirect uri
      redirectUri: process.env.NEXT_PUBLIC_FURO_REDIRECT_URI,
    }).then((user: KaKaoLoginUser) => {
      if (_.isNil(user)) return;

      const { uid, display_name, profile_url } = user;

      fetchImagesInFirebaseStorage().then((cuzImageUrls) => {
        const cuzProfileUrl = cuzImageUrls[Math.floor(Math.random() * cuzImageUrls.length)];

        authorize({
          uid,
          displayName: display_name,
          image: profile_url === KAKAO_DEFAULT_PROFILE_IMAGE_URL ? cuzProfileUrl : profile_url,
        });
      });

      // 이전에 플레이한 경험이 있는 사용자라면,
      // 로봇 커스텀 정보를 불러오기
      getPlayer(uid).then(async (res) => {
        // 만약 로그인한 사용자에 대해 서버에 저장된 로봇 캐릭터 정보가 있다면,
        if (res.length !== 0) {
          const { uid, headTag, modelType, modelColor, score, playedNum, gotFirstPlace } = res[0];

          assignPlayer({
            ...(player as Player),
            uid: uid,
            headTag,
            modelType,
            modelColor,
            thisRoundScore: 0,
            allRoundScore: score ?? {},
            playedNum: playedNum ?? 0,
            gotFirstPlace: gotFirstPlace ?? 0,
          });
        } else {
          // 없다면, 새로운 문서 생성
          createPlayer({
            uid: uid,
            profileUrl: profile_url,
            username: display_name,
          });
        }
        // 사용자가 입장할 섹션을 선택하는 페이지로 이동
        router.push(Page.START_YOUR_JOURNEY);
      });
    });
  }, [gameRound.gameModeBaseObjectPath]);

  return <Container>로딩중...</Container>;
}
