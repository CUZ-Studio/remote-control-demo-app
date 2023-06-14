/* eslint-disable react/no-unknown-property */
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import BasicInput from "@/components/atoms/BasicInput";
import ErrorBox from "@/components/atoms/ErrorBox";
import Model from "@/components/organisms/Model";
import { createPlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page, RobotModelType } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Container, StyledForm } from "@/styles/name.styles";

export default function NameYourRobot() {
  const router = useRouter();

  const user = useUser();
  const gameRound = useGameStatus();
  const player = usePlayer();
  const [inputValue, setInputValue] = useState(user?.username);
  const [errorMessage, setErrorMessage] = useState("");
  const { assignPlayer, updateGameRound } = useGameActions();

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

    if (/[`~!@#$%^&*|\\'";:/?]/gi.test(inputValue)) {
      setErrorMessage("문자 또는 숫자만 사용가능합니다");
      return;
    }

    try {
      const newPlayerId = uuidv4();
      // 언리얼로 캐릭터 생성 요청 보내기
      const createdCharacterInfo = await axios.put(
        `${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`,
        {
          objectPath: gameRound.gameModeBaseObjectPath,
          functionName: "BindingCharacter",
          parameters: {
            Model: player.model, // SmartDrone , Robot2 , Robot3
            Color: player.color,
            Name: inputValue,
            UID: newPlayerId,
          },
          generateTransaction: true,
        },
      );

      if (createdCharacterInfo.data) {
        await createPlayer({
          playerId: newPlayerId,
          headTag: inputValue,
          modelColor: player.color,
          modelType: player.model,
          username: user.username,
        });

        assignPlayer({
          ...player,
          playerId: newPlayerId,
          headTag: inputValue,
          objectPath: createdCharacterInfo.data.CharacterPath,
        });

        // 로봇 커스텀 단계 생략하고 바로 게임 실행 화면으로 페이지 이동
        // 현재 진행중인 게임 라운드의 남은 시간 업데이트
        router.push(Page.PLAY).then(async () => {
          // 임시 처리
          if (player.model === RobotModelType.SMART_DRONE) {
            // 캐릭터가 게임 화면 중심에 나타나게 하기
            await axios.put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
              objectPath: createdCharacterInfo.data.CharacterPath,
              functionName: "SetPlayerLocation",
              generateTransaction: true,
            });
          }
          updateGameRound({
            ...gameRound,
            isPlaying: true,
            timeLeft: createdCharacterInfo.data.MainGameRemainTime,
          });
        });
      }
    } catch (error) {
      toast.error("캐릭터를 생성할 수 없습니다. 잠시 후에 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <h1>로봇 이름 짓기</h1>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Model />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <StyledForm noValidate onSubmit={createCharacter}>
        <BasicInput
          value={inputValue}
          error={!!errorMessage}
          onChange={handleChange}
          onFocus={() => setErrorMessage("")}
        />
        <BasicButton type="submit" shape={ButtonShape.RECTANGLE} disabled={!inputValue}>
          게임 플레이하러 가기
        </BasicButton>
      </StyledForm>
    </Container>
  );
}
