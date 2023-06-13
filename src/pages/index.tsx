import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import BasicInput from "@/components/atoms/BasicInput";
import ErrorBox from "@/components/atoms/ErrorBox";
import { createPlayer, getPlayer } from "@/firebase/players";
import useAuthActions from "@/hooks/useAuthActions";
import useGameActions from "@/hooks/useGameActions";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page } from "@/types";

import { Container, StyledForm } from "@/styles/home.styles";

export default function HomePage() {
  const userId = uuidv4();
  const router = useRouter();
  const user = useUser();
  const { authorize } = useAuthActions();
  const { assignPlayer, updateGameStatus } = useGameActions();

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

    if (!/^[a-zA-Z]+$/.test(inputValue)) {
      setErrorMessage("영문자만 사용가능합니다");
      return;
    }

    try {
      const createdCharacterInfo = await axios.put(
        `${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`,
        {
          objectPath: "/Game/Level/UEDPIE_0_Main.Main:PersistentLevel.BP_GameModeBase_C_0",
          functionName: "BindingCharacter",
          generateTransaction: true,
        },
      );

      const storedPlayerInfo = await getPlayer(inputValue);

      if (storedPlayerInfo.length) {
        assignPlayer({
          id: storedPlayerInfo[0].id,
          displayName: storedPlayerInfo[0].displayName,
          objectPath: createdCharacterInfo.data.CharacterPath,
          moveForward: storedPlayerInfo[0].status.moveForward,
        });
      } else {
        const playerId = uuidv4();

        await createPlayer({
          playerId,
          displayName: `@${inputValue}`,
          userId: inputValue,
        });

        assignPlayer({
          id: playerId,
          displayName: `@${inputValue}`,
          objectPath: createdCharacterInfo.data.CharacterPath,
          moveForward: 0,
        });
      }
      authorize({
        id: userId,
        username: inputValue,
      });

      updateGameStatus({
        isPlaying: true,
        timeLeft: createdCharacterInfo.data.MainGameRemainTime,
      });
      router.push(Page.PLAY);
    } catch (error) {
      const notify = () => toast.error("실행중인 게임이 없습니다");
      notify();
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
          닉네임 정하기
        </BasicButton>
      </StyledForm>
    </Container>
  );
}
