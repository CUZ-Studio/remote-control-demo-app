import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import { getPlayer } from "@/firebase/players";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import useUser from "@/hooks/useUser";
import { KaKaoLoginUser, Page } from "@/types";

import { Container } from "@/styles/home.styles";

export default function HomePage() {
  const router = useRouter();
  const user = useUser();
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
      if (!user) {
        return;
      }
      const { uid, display_name, profile_url } = user;
      authorize({
        uid,
        displayName: display_name,
        image: profile_url,
      });
      // 이전에 플레이한 경험이 있는 사용자라면,
      // 로봇 커스텀 정보를 불러오기
      getPlayer(uid)
        .then(async (res) => {
          // (1) 만약 로그인한 사용자에 대해 서버에 저장된 로봇 정보가 있다면,
          if (res.length !== 0) {
            const { uid, headTag, modelType, modelColor } = res[0];
            // 이전의 로봇 커스텀 정보(로봇 유형 및 색상)를 활용하여 캐릭터 생성
            const createdCharacterInfo = await axios.put(
              `${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`,
              {
                objectPath: gameRound.gameModeBaseObjectPath,
                functionName: "BindingCharacter",
                parameters: {
                  Model: modelType,
                  Color: modelColor,
                  Name: headTag,
                  UID: uid,
                },
                generateTransaction: true,
              },
            );

            if (!createdCharacterInfo.data) return;

            assignPlayer({
              playerId: uid,
              headTag,
              objectPath: createdCharacterInfo.data.CharacterPath,
              model: modelType,
              color: modelColor,
            });

            router.push(Page.WELCOME);

            // 로봇 커스텀 단계 생략하고 바로 게임 실행 화면으로 페이지 이동
            // 현재 진행중인 게임 라운드의 남은 시간 업데이트
            // router.push(Page.PLAY).then(() => {
            //   // 캐릭터가 게임 화면 중심에 나타나게 하기
            //   axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
            //     objectPath: createdCharacterInfo.data.CharacterPath,
            //     functionName: "SetPlayerLocation",
            //     generateTransaction: true,
            //   });
            //   updateGameRound({
            //     ...gameRound,
            //     isPlaying: true,
            //     timeLeft: createdCharacterInfo.data.MainGameRemainTime,
            //   });
            // });
          } else {
            // (2) 만약 로그인한 사용자에 대해 서버에 저장된 로봇 정보가 없다면,
            // 플레이하고 싶은 로봇 모델 유형을 선택하는 페이지로 이동
            router.push(Page.WELCOME);
          }
        })
        .catch(() => toast.error("실행중인 게임이 없습니다"));
    });
  }, [gameRound.gameModeBaseObjectPath]);

  return <Container>{JSON.stringify(user, null, 2)}</Container>;
}
