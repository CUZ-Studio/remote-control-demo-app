/* eslint-disable react/no-unknown-property */
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import BasicButton from "@/components/atoms/BasicButton";
import BasicInput from "@/components/atoms/BasicInput";
import ErrorBox from "@/components/atoms/ErrorBox";
import Model from "@/components/organisms/Model";
import { createPlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  CanvasWrapper,
  Container,
  Greeting,
  InputWrapper,
  MainSection,
  StyledForm,
} from "@/styles/name.styles";

export default function NameYourRobot() {
  const router = useRouter();

  const user = useUser();
  const gameRound = useGameStatus();
  const player = usePlayer();
  const [inputValue, setInputValue] = useState(player?.headTag || user?.displayName);
  const [errorMessage, setErrorMessage] = useState("");
  const { assignPlayer, updateGameRound } = useGameActions();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setInputValue(e.currentTarget.value);
  };

  const createCharacter: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setErrorMessage("필수항목입니다");
      return;
    }

    if (/[`~!@#$%^&*|\\'";:/?]/gi.test(inputValue)) {
      setErrorMessage("문자 또는 숫자만 사용가능합니다");
      return;
    }

    // 언리얼로 캐릭터 생성 요청 보내기
    axios
      .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
        objectPath: gameRound.gameModeBaseObjectPath,
        functionName: "BindingCharacter",
        parameters: {
          Model: player.model,
          Color: player.color,
          Name: inputValue,
          UID: user.uid,
        },
        generateTransaction: true,
      })
      .then((res) => {
        const createdCharacterInfo = res.data;
        if (createdCharacterInfo) {
          // firebase 데이터베이스에 새로운 플레이어 생성 요청
          createPlayer({
            uid: user.uid,
            profileUrl: user.image,
            headTag: inputValue,
            modelColor: player.color,
            modelType: player.model,
            username: user.displayName,
            score: player.score ?? 0,
            playedNum: player.playedNum ?? 0,
          });

          // 전역상태로 새로운 플레이어 정보 저장
          assignPlayer({
            ...player,
            uid: user.uid,
            headTag: inputValue,
            objectPath: createdCharacterInfo.CharacterPath,
          });

          // 현재 진행중인 게임 라운드의 남은 시간 업데이트
          updateGameRound({
            ...gameRound,
            isGameInProgress: !!Number(createdCharacterInfo.MainGameRemainTime),
            timeLeft: createdCharacterInfo.MainGameRemainTime,
          });

          // 로봇 커스텀 단계 생략하고 바로 게임 실행 화면으로 페이지 이동
          router.push(Page.GOING_TO_HANGAR);
        }
      });
  };

  return (
    <Container>
      <MainSection>
        <Greeting>{`마지막으로\n로봇의 이름을 입력해주세요.`}</Greeting>
        <CanvasWrapper>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10, 15, 10]} />
            <Model />
            <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          </Canvas>
        </CanvasWrapper>
        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <StyledForm noValidate onSubmit={createCharacter}>
          <InputWrapper>
            <BasicInput
              value={inputValue}
              error={!!errorMessage}
              onChange={handleChange}
              onFocus={() => setErrorMessage("")}
            />
          </InputWrapper>
          <BasicButton type="submit" shape={ButtonShape.RECTANGLE} onClick={createCharacter}>
            로봇 생성 완료
          </BasicButton>
        </StyledForm>
      </MainSection>
    </Container>
  );
}
