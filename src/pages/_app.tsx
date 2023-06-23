import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import axios from "axios";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";

import BasicLayout from "@/components/templates/BasicLayout";
import createEmotionCache from "@/createEmotionCache";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import wrapper from "@/slices/store";
import { KaKaoLoginUser, Page, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import theme from "@/styles/theme";

import "react-toastify/dist/ReactToastify.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  const gameRound = useGameRound();
  const { authorize } = useAuthActions();
  const { updateGameRound } = useGameActions();

  useEffect(() => {
    if (gameRound.gameModeBaseObjectPath) return;
    // 언리얼 게임모드 상대경로 정보 요청하기
    // 로그인하는 즉시 캐릭터 생성 요청을 보내게 될 때에 경로가 필요할 수 있으므로,
    // 로그인 여부와 상관없이 미리 요청해서 받아두는 게 좋음
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath:
          "/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_GetGameModeBaseObjectPath_C_1",
        access: REMOTE_CONTROL_API_ACCESS_TYPE.READ_ACCESS,
        propertyName: "GameModeBaseObjPath",
      })
      .then((res) => {
        updateGameRound({
          ...gameRound,
          gameModeBaseObjectPath: res.data.GameModeBaseObjPath,
        });
      })
      .catch(() => {
        // router.replace(Page.HOME);
        toast.error("언리얼 게임모드 상대경로 정보 요청 실패");
      });
  }, []);

  useEffect(() => {
    // furo 사용자 데려오기
    window.Furo.getUser().then((user: KaKaoLoginUser) => {
      if (_.isNil(user)) return;

      const { uid, display_name, profile_url } = user;
      authorize({
        uid,
        displayName: display_name,
        image: profile_url,
      });
    });
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
          limit={1}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
