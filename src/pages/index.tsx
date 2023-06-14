import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import BasicInput from "@/components/atoms/BasicInput";
import ErrorBox from "@/components/atoms/ErrorBox";
import { getPlayer } from "@/firebase/players";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useGameRound from "@/hooks/useGameRound";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page } from "@/types";

import { Container, StyledForm } from "@/styles/home.styles";

export default function HomePage() {
  const userId = uuidv4();
  const router = useRouter();
  const user = useUser();
  const gameRound = useGameRound();
  const { authorize } = useAuthActions();
  const { assignPlayer, updateGameRound } = useGameActions();

  const [inputValue, setInputValue] = useState(user?.username ?? "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    if (user) return;

    setErrorMessage("");
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setErrorMessage("필수항목입니다");
      return;
    }

    if (/[`~!@#$%^&*|\\'";:/?]/gi.test(inputValue)) {
      setErrorMessage("문자 또는 숫자만 사용가능합니다");
      return;
    }

    authorize({
      id: userId,
      username: inputValue,
    });

    try {
      // 이전에 플레이한 경험이 있는 사용자라면,
      // 로봇 커스텀 정보를 불러오기
      const storedPlayerInfo = await getPlayer(inputValue);

      // (1) 만약 로그인한 사용자에 대해 서버에 저장된 로봇 정보가 있다면,
      if (storedPlayerInfo.length !== 0) {
        const { id, headTag, modelType, modelColor } = storedPlayerInfo[0];

        // 이전의 로봇 커스텀 정보(로봇 유형 및 색상)를 활용하여 캐릭터 생성
        const createdCharacterInfo = await axios.put(
          `${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`,
          {
            objectPath: gameRound.gameModeBaseObjectPath,
            functionName: "BindingCharacter",
            parameters: {
              Model: modelType, // SmartDrone , Robot2 , Robot3
              Color: modelColor,
              Name: headTag,
              UID: id,
            },
            generateTransaction: true,
          },
        );

        // 성공적으로 언리얼 게임에 새로운 로봇이 생성되었다면,
        // 클라이언트 앱에 전역 상태로 로봇 정보 저장
        if (createdCharacterInfo.data) {
          assignPlayer({
            playerId: id,
            headTag,
            objectPath: createdCharacterInfo.data.CharacterPath,
            model: modelType,
            color: modelColor,
          });

          // 로봇 커스텀 단계 생략하고 바로 게임 실행 화면으로 페이지 이동
          // 현재 진행중인 게임 라운드의 남은 시간 업데이트
          router.push(Page.PLAY).then(() => {
            updateGameRound({
              ...gameRound,
              isPlaying: true,
              timeLeft: createdCharacterInfo.data.MainGameRemainTime,
            });
          });
        } else {
          throw new Error("캐릭터를 생성할 수 없습니다. 잠시후에 다시 시도해주세요");
        }
      } else {
        // (2) 만약 로그인한 사용자에 대해 서버에 저장된 로봇 정보가 없다면,
        // 플레이하고 싶은 로봇 모델 유형을 선택하는 페이지로 이동
        router.push(Page.SELECT_MODEL);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("실행중인 게임이 없습니다");
    }
  };

  return (
    <Container>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <StyledForm noValidate onSubmit={handleSubmit}>
        <BasicInput
          value={inputValue}
          error={!!errorMessage}
          onChange={handleChange}
          onFocus={() => setErrorMessage("")}
        />
        <BasicButton type="submit" disabled={!!user} shape={ButtonShape.RECTANGLE}>
          나의 닉네임 정하기
        </BasicButton>
      </StyledForm>
    </Container>
  );
}
