import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import axios from "axios";
import _ from "lodash";
import { Provider as ReduxProvider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import BasicLayout from "@/components/templates/BasicLayout";
import createEmotionCache from "@/createEmotionCache";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import useUser from "@/hooks/useUser";
import { persistor, store, wrapper } from "@/slices/store";
import { Page, REMOTE_CONTROL_API_ACCESS_TYPE } from "@/types";

import theme from "@/styles/theme";

import "react-toastify/dist/ReactToastify.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const user = useUser();
  const gameRound = useGameRound();
  const { updateGameRound } = useGameActions();

  useEffect(() => {
    if (gameRound.gameModeBaseObjectPath) return;
    // 언리얼 게임모드 상대경로 정보 요청하기
    // 로그인하는 즉시 캐릭터 생성 요청을 보내게 될 때에 경로가 필요할 수 있으므로,
    // 로그인 여부와 상관없이 미리 요청해서 받아두는 게 좋음
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: process.env.NEXT_PUBLIC_GAME_MODE_OBJECT_PATH,
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
        toast.error("언리얼 게임모드 상대경로 정보 요청 실패");
      });
  }, []);

  const isProtectedRoute = (url: string) => {
    const protectedRoutes: string[] = [
      Page.CUSTOMIZE_DESIGN,
      Page.GOING_TO_HANGAR,
      Page.NAME_YOUR_ROBOT,
      Page.PLAY,
      Page.SELECT_MODEL,
      Page.WELCOME_BACK,
      Page.START_YOUR_JOURNEY,
    ];
    return protectedRoutes.includes(url);
  };

  useEffect(() => {
    // furo 사용자 데려오기
    if (_.isNil(user)) {
      if (isProtectedRoute(router.asPath)) router.replace(Page.HOME);
    }
  }, [router.asPath]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
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
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
