import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import axios from "axios";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import BasicLayout from "@/components/templates/BasicLayout";
import createEmotionCache from "@/createEmotionCache";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import { persistor, store, wrapper } from "@/slices/store";
import { Developer, REMOTE_CONTROL_API_ACCESS_TYPE, Slack_Developer_User_ID } from "@/types";
import noticeToSlack from "@/utils/noticeToSlack";
import noticeToSWIT from "@/utils/noticeToSWIT";

import theme from "@/styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const gameRound = useGameRound();
  const { updateGameRound } = useGameActions();

  useEffect(() => {
    // 언리얼 게임모드 상대경로 정보 요청하기
    // 로그인하는 즉시 캐릭터 생성 요청을 보내게 될 때에 경로가 필요할 수 있으므로,
    // 로그인 여부와 상관없이 미리 요청해서 받아두는 게 좋음
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/property`, {
        objectPath: `${process.env.NEXT_PUBLIC_GAME_MODE_OBJECT_PATH}`,
        access: REMOTE_CONTROL_API_ACCESS_TYPE.READ_ACCESS,
        propertyName: "GameModeBaseObjPath",
      })
      .then((res) => {
        updateGameRound({
          ...gameRound,
          gameModeBaseObjectPath: res.data.GameModeBaseObjPath,
        });
      })
      .catch((error) => {
        noticeToSlack({
          assignees: [Slack_Developer_User_ID.GODA, Slack_Developer_User_ID.GUNI],
          isUrgent: true,
          errorName: error.name,
          errorCode: error.response?.status,
          errorMessage: `"GameModeBaseObjPath" 프로퍼티를 호출하는 함수에서 다음 에러 발생: ${error.response?.data.errorMessage}`,
        });
        noticeToSWIT({
          assignees: [Developer.GODA, Developer.GUNI],
          isUrgent: true,
          errorName: error.name,
          errorCode: error.response?.status,
          errorMessage: `"GameModeBaseObjPath" 프로퍼티를 호출하는 함수에서 다음 에러 발생: ${error.response?.data.errorMessage}`,
        });
      });
  }, []);
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
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
