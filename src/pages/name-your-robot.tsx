/* eslint-disable react/no-unknown-property */
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { isMobile } from "react-device-detect";

import BasicInput from "@/components/atoms/BasicInput";
import ErrorBox from "@/components/atoms/ErrorBox";
import PlayButton from "@/components/atoms/PlayButton";
import Model from "@/components/organisms/Model";
import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import { Page, RobotColor, RobotModelType } from "@/types";
import isProfane from "@/utils/isProfane";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  CanvasWrapper,
  Container,
  GradientPaper,
  Greeting,
  Inner,
  InputWrapper,
  StyledForm,
} from "@/styles/name-your-robot.styles";

export default function NameYourRobot() {
  const router = useRouter();

  const user = useUser();
  const player = usePlayer();
  const [inputValue, setInputValue] = useState(player?.headTag || user?.displayName);
  const [errorMessage, setErrorMessage] = useState("");
  const { assignPlayer } = useGameActions();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setInputValue(e.currentTarget.value);
  };

  const createCharacter: FormEventHandler = async (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setErrorMessage("필수항목입니다");
      return;
    }

    if (/[`~!@#$%^&*|\\'",;:/?]/gi.test(inputValue as string)) {
      setErrorMessage("문자 또는 숫자만 사용가능합니다");
      return;
    }

    if (isProfane({ keyword: inputValue as string })) {
      setErrorMessage("비속어를 포함하고 있습니다");
      return;
    }

    if (_.isNil(user)) return;
    if (_.isNil(player)) return;
    // 전역상태로 새로운 플레이어 정보 저장
    assignPlayer({
      ...(player as Player),
      headTag: inputValue || user?.displayName,
    });
    // firebase 데이터베이스에 새로운 플레이어 생성 요청
    updatePlayer({
      documentId: user?.uid,
      updated: {
        headTag: inputValue as string,
        modelColor: (player.modelColor as RobotColor) || RobotColor.WHITE,
        modelType: (player.modelType as RobotModelType) || RobotModelType.SMART_DRONE,
        score: player.allRoundScore ?? {},
        playedNum: player.playedNum ?? 0,
      },
    });
    router.push(Page.WAITING_ROOM);
  };

  return (
    <Container isMobile={isMobile}>
      <GradientPaper />
      <Inner>
        <Greeting>{`마지막으로\n로봇의 이름을 입력해주세요.`}</Greeting>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10, 15, 10]} />
            <Model />
            <OrbitControls
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
        </CanvasWrapper>
        <StyledForm noValidate onSubmit={createCharacter}>
          <InputWrapper>
            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
            <BasicInput
              value={inputValue as string}
              error={!!errorMessage}
              onChange={handleChange}
              onFocus={() => setErrorMessage("")}
            />
          </InputWrapper>
          <PlayButton type="submit">로봇 생성 완료</PlayButton>
        </StyledForm>
      </Inner>
    </Container>
  );
}
